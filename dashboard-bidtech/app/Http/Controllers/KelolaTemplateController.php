<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Services\TemplateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Katalog template di Admin CMS (khusus admin; dijaga middleware 'role:ADMIN').
 */
class KelolaTemplateController extends Controller
{
    public function index(Request $request, TemplateService $templates): View
    {
        return view('pages.kelola-template', array_merge(['mode' => 'index'], $templates->list(
            $request->filled('search') ? (string) $request->search : null,
            $request->filled('category') ? (string) $request->category : null,
            (string) $request->get('sort', 'newest'),
        )));
    }

    public function create(): View
    {
        return view('pages.kelola-template', [
            'mode' => 'create',
            'existingCategories' => Template::distinct('category')->pluck('category')->filter()->values(),
        ]);
    }

    public function store(Request $request, TemplateService $templates): RedirectResponse
    {
        $templates->create($this->templateData($request->validate($this->templateRules()), $request));

        return redirect()->route('dashboard.templates.index')
            ->with('success', 'Template baru berhasil ditambahkan dan langsung aktif di katalog website!');
    }

    public function edit(Template $template): View
    {
        return view('pages.kelola-template', [
            'mode' => 'edit',
            'template' => $template,
            'existingCategories' => Template::distinct('category')->pluck('category')->filter()->values(),
        ]);
    }

    public function update(Request $request, Template $template, TemplateService $templates): RedirectResponse
    {
        $templates->update($template, $this->templateData($request->validate($this->templateRules()), $request));

        return redirect()->route('dashboard.templates.index')->with('success', 'Data template berhasil diperbarui!');
    }

    public function destroy(Template $template, TemplateService $templates): RedirectResponse
    {
        if (! $templates->delete($template)) {
            return redirect()->route('dashboard.templates.index')
                ->with('warning', 'Template memiliki riwayat pesanan (orders), sehingga statusnya dinonaktifkan agar data transaksi tetap utuh.');
        }

        return redirect()->route('dashboard.templates.index')->with('success', 'Template berhasil dihapus.');
    }

    public function toggleActive(Template $template, TemplateService $templates): RedirectResponse
    {
        $templates->toggleActive($template);

        $status = $template->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Template '{$template->name}' berhasil {$status}.");
    }

    private function templateRules(): array
    {
        return [
            'name'           => 'required|string|max:150',
            'category'       => 'required|string|max:100',
            'template_price' => 'required|numeric|min:0',
            'server_price'   => 'required|numeric|min:0',
            'service_price'  => 'required|numeric|min:0',
            'template_desc'  => 'nullable|string|max:255',
            'server_desc'    => 'nullable|string|max:255',
            'service_desc'   => 'nullable|string|max:255',
            'demo_url'       => 'nullable|string|max:255',
            'description'    => 'nullable|string',
            'tags'           => 'nullable|string|max:255',
            'preview_file'   => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:4096',
            'preview_url'    => 'nullable|string|max:255',
            'is_active'      => 'nullable|boolean',
        ];
    }

    /**
     * Data tervalidasi ditambah status aktif (default aktif bila tidak dikirim).
     */
    private function templateData(array $validated, Request $request): array
    {
        return array_merge($validated, ['is_active' => $request->boolean('is_active', true)]);
    }
}
