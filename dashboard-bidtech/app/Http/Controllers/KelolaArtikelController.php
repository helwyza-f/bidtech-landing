<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Services\ArticleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Kelola artikel di dashboard (Media & Admin; izin per aksi dicek lewat User::canWriteArticles / canModerateArticles) beserta unggah gambarnya.
 */
class KelolaArtikelController extends Controller
{
    public function index(Request $request, ArticleService $articles): View
    {
        $this->ensureCanModerate($request);
        $user = $request->user();

        // Belum pernah pilih filter penulis sama sekali -> media default lihat artikelnya sendiri dulu
        // (tetap bisa diganti; pilih "Semua Penulis" mengirim created_by kosong, bukan hilang dari query).
        $createdBy = match (true) {
            $request->filled('created_by') => $request->integer('created_by'),
            $request->has('created_by') => null,
            $user->isMedia() => $user->id,
            default => null,
        };

        return view('pages.kelola-artikel', array_merge(['mode' => 'index'], $articles->list(
            $createdBy,
            $request->filled('status') ? (string) $request->string('status') : null,
            $request->filled('search') ? (string) $request->string('search') : null,
        )));
    }

    public function create(Request $request, ArticleService $articles): View
    {
        $this->ensureCanWrite($request);

        return view('pages.kelola-artikel', [
            'mode' => 'create',
            'editorData' => $this->editorData($request, $articles),
        ]);
    }

    public function store(Request $request, ArticleService $articles): RedirectResponse
    {
        $this->ensureCanWrite($request);
        $this->normalizeArticlePayload($request, titleRequired: true);

        $article = $articles->create(
            $request->validate($this->saveArticleRules(), $this->saveArticleMessages()),
            $request->user()
        );

        return redirect()->route('dashboard.articles.edit', $article)
            ->with('success', 'Artikel berhasil dibuat sebagai draf. Klik "Publikasikan" bila sudah siap tampil di publik.');
    }

    public function storeDraft(Request $request, ArticleService $articles): JsonResponse
    {
        $this->ensureCanAutosave($request, null);
        $this->normalizeArticlePayload($request, titleRequired: false);

        $article = $articles->createDraft($request->validate($this->autosaveArticleRules()), $request->user());

        return response()->json($this->editorResponse($article, $articles), 201);
    }

    public function autosave(Request $request, Article $article, ArticleService $articles): JsonResponse
    {
        $this->ensureCanAutosave($request, $article);
        $this->normalizeArticlePayload($request, titleRequired: false);

        $article = $articles->autosaveDraft($article, $request->validate($this->autosaveArticleRules()), $request->user());

        return response()->json($this->editorResponse($article, $articles));
    }

    public function edit(Request $request, Article $article, ArticleService $articles): View
    {
        $this->ensureCanModerate($request);

        return view('pages.kelola-artikel', [
            'mode' => 'edit',
            'article' => $article,
            'editorData' => $this->editorData($request, $articles, $article),
        ]);
    }

    public function update(Request $request, Article $article, ArticleService $articles): JsonResponse|RedirectResponse
    {
        $this->ensureCanWrite($request);
        $this->normalizeArticlePayload($request, titleRequired: true);

        $article = $articles->update(
            $article,
            $request->validate($this->saveArticleRules(), $this->saveArticleMessages()),
            $request->user()
        );

        if ($request->expectsJson()) {
            return response()->json($this->editorResponse($article, $articles));
        }

        return redirect()->route('dashboard.articles.edit', $article)
            ->with('success', 'Perubahan artikel berhasil disimpan.');
    }

    public function destroy(Request $request, Article $article, ArticleService $articles): JsonResponse|RedirectResponse
    {
        $this->ensureCanModerate($request);

        $articles->delete($article, $request->user());

        if ($request->expectsJson()) {
            return response()->json(['redirect_url' => route('dashboard.articles.index')]);
        }

        return redirect()->route('dashboard.articles.index')
            ->with('success', 'Artikel berhasil dihapus. Artikel yang dihapus tidak akan tampil kembali.');
    }

    public function publish(Request $request, Article $article, ArticleService $articles): JsonResponse|RedirectResponse
    {
        $this->ensureCanWrite($request);

        $article = $articles->publish($article, $request->user());

        if ($request->expectsJson()) {
            return response()->json($this->editorResponse($article, $articles));
        }

        return back()->with('success', 'Artikel berhasil dipublikasikan.');
    }

    public function deactivate(Request $request, Article $article, ArticleService $articles): JsonResponse|RedirectResponse
    {
        $this->ensureCanModerate($request);

        $article = $articles->deactivate($article, $request->user());

        if ($request->expectsJson()) {
            return response()->json($this->editorResponse($article, $articles));
        }

        return back()->with('warning', 'Artikel dinonaktifkan. Halaman publik akan menampilkan 404 dan peringkat bisa turun sementara.');
    }

    public function activate(Request $request, Article $article, ArticleService $articles): JsonResponse|RedirectResponse
    {
        $this->ensureCanModerate($request);

        $article = $articles->activate($article, $request->user());

        if ($request->expectsJson()) {
            return response()->json($this->editorResponse($article, $articles));
        }

        return back()->with('success', 'Artikel diaktifkan kembali dan akan tampil di publik.');
    }

    public function uploadImage(Request $request, ArticleService $articles): JsonResponse
    {
        $this->ensureCanWrite($request);

        $request->validate([
            'image' => [
                'required',
                'file',
                'mimetypes:image/jpeg,image/png,image/webp,image/avif,image/gif',
                'max:10240',
            ],
        ], [
            'image.required' => 'Gambar wajib dipilih.',
            'image.mimetypes' => 'Gambar harus berupa JPG, PNG, WebP, AVIF, atau GIF.',
            'image.max' => 'Ukuran gambar maksimal 10 MB.',
        ]);

        $image = $articles->uploadImage($request->file('image'), $request->user());

        return response()->json([
            'image_id' => $image->id,
            'url' => $image->publicUrl(),
            'width' => $image->width,
            'height' => $image->height,
        ]);
    }

    private function ensureCanWrite(Request $request): void
    {
        abort_unless($request->user()->canWriteArticles(), 403);
    }

    private function ensureCanModerate(Request $request): void
    {
        abort_unless($request->user()->canModerateArticles(), 403);
    }

    private function ensureCanAutosave(Request $request, ?Article $article): void
    {
        abort_unless(
            $request->user()->canWriteArticles() && ($article === null || $article->status === ArticleStatus::Draft),
            403
        );
    }

    /**
     * Konten BlockNote dikirim sebagai JSON string; decode dulu sebelum validasi array.
     */
    private function normalizeArticlePayload(Request $request, bool $titleRequired): void
    {
        $content = $request->input('content', []);
        $decodedContent = is_string($content) ? json_decode($content, true) : $content;

        $request->merge([
            'title' => $titleRequired
                ? trim((string) $request->input('title'))
                : ($request->filled('title') ? trim((string) $request->input('title')) : null),
            'content' => is_array($decodedContent) ? $decodedContent : [],
        ]);
    }

    private function saveArticleRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:200'],
            'content' => [
                'required', 'array',
                function (string $attribute, mixed $value, \Closure $fail) {
                    foreach (app(ArticleService::class)->checkContent($value) as $error) {
                        $fail($error);
                    }
                },
            ],
            'cover_image' => [
                'nullable',
                'file',
                'mimetypes:image/jpeg,image/png,image/webp,image/avif,image/gif',
                'max:10240',
            ],
            'cover_image_id' => ['nullable', 'integer', 'exists:article_images,id'],
            'remove_cover' => ['sometimes', 'boolean'],
        ];
    }

    private function saveArticleMessages(): array
    {
        return [
            'title.required' => 'Judul artikel wajib diisi.',
            'content.required' => 'Isi artikel wajib diisi.',
            'cover_image.mimetypes' => 'Cover harus berupa JPG, PNG, WebP, AVIF, atau GIF.',
            'cover_image.max' => 'Ukuran cover maksimal 10 MB.',
        ];
    }

    private function autosaveArticleRules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:200'],
            'content' => [
                'present',
                'array',
                function (string $attribute, mixed $value, \Closure $fail) {
                    foreach (app(ArticleService::class)->checkContent($value, allowEmpty: true) as $error) {
                        $fail($error);
                    }
                },
            ],
            'cover_image_id' => ['nullable', 'integer', 'exists:article_images,id'],
            'remove_cover' => ['sometimes', 'boolean'],
        ];
    }

    private function editorData(Request $request, ArticleService $articles, ?Article $article = null): array
    {
        $user = $request->user();
        $articleData = $article ? $articles->articleData($article) : [
            'id' => null,
            'title' => '',
            'slug' => null,
            'status' => ArticleStatus::Draft->value,
            'status_label' => ArticleStatus::Draft->label(),
            'content' => [],
            'cover_image_url' => null,
            'cover_display_url' => config('articles.cover_placeholder_url'),
            'cover_alt_text' => '',
            'cover_placeholder_url' => config('articles.cover_placeholder_url'),
            'author' => [
                'name' => $user->displayAuthorName(),
                'photo_url' => $user->photo_url,
            ],
            'published_at' => null,
            'created_at' => null,
            'updated_at' => null,
            'meta_title' => '',
            'meta_description' => '',
            'character_count' => 0,
            'reading_minutes' => 0,
        ];

        return [
            'article' => $articleData,
            'capabilities' => [
                'write' => $user->canWriteArticles(),
                'moderate' => $user->canModerateArticles(),
            ],
            'endpoints' => [
                'index' => route('dashboard.articles.index'),
                'draft_store' => route('dashboard.articles.drafts.store'),
                'upload' => route('dashboard.articles.images.store'),
                ...($article ? $this->articleEndpoints($article) : []),
            ],
        ];
    }

    private function editorResponse(Article $article, ArticleService $articles): array
    {
        return [
            'article' => $articles->articleData($article),
            'edit_url' => route('dashboard.articles.edit', $article),
            'saved_at' => now()->toIso8601String(),
            'endpoints' => $this->articleEndpoints($article),
        ];
    }

    private function articleEndpoints(Article $article): array
    {
        return [
            'autosave' => route('dashboard.articles.autosave', $article),
            'update' => route('dashboard.articles.update', $article),
            'publish' => route('dashboard.articles.publish', $article),
            'deactivate' => route('dashboard.articles.deactivate', $article),
            'activate' => route('dashboard.articles.activate', $article),
            'destroy' => route('dashboard.articles.destroy', $article),
        ];
    }
}
