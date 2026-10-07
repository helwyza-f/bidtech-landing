import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BlockNoteSchema, defaultBlockSpecs, combineByGroup } from "@blocknote/core";
import { filterSuggestionItems } from "@blocknote/core/extensions";
import {
    getDefaultReactSlashMenuItems,
    SuggestionMenuController,
    useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import * as locales from "@blocknote/core/locales";
import {
    getMultiColumnSlashMenuItems,
    multiColumnDropCursor,
    locales as multiColumnLocales,
    withMultiColumn,
} from "@blocknote/xl-multi-column";

const restrictedHeading = {
    ...defaultBlockSpecs.heading,
    config: {
        ...defaultBlockSpecs.heading.config,
        propSchema: {
            ...defaultBlockSpecs.heading.config.propSchema,
            level: { default: 2, values: [2, 3] },
        },
    },
};

const articleSchema = withMultiColumn(BlockNoteSchema.create({
    blockSpecs: {
        paragraph: defaultBlockSpecs.paragraph,
        heading: restrictedHeading,
        bulletListItem: defaultBlockSpecs.bulletListItem,
        numberedListItem: defaultBlockSpecs.numberedListItem,
        quote: defaultBlockSpecs.quote,
        image: defaultBlockSpecs.image,
        divider: defaultBlockSpecs.divider,
        table: defaultBlockSpecs.table,
    },
}));

function csrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.content ?? "";
}

function errorMessage(body, fallback) {
    const first = body?.errors ? Object.values(body.errors).flat()[0] : null;
    return first || body?.message || fallback;
}

async function requestJson(url, { method = "GET", body, formData } = {}) {
    const response = await fetch(url, {
        method,
        headers: {
            Accept: "application/json",
            "X-CSRF-TOKEN": csrfToken(),
            ...(formData ? {} : { "Content-Type": "application/json" }),
        },
        body: formData ?? (body === undefined ? undefined : JSON.stringify(body)),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(errorMessage(payload, "Permintaan tidak dapat diproses."));
    }
    return payload;
}

function collectText(value, parts) {
    if (!value || typeof value !== "object") return;
    if (value.type === "text" && typeof value.text === "string") {
        parts.push(value.text);
        return;
    }
    Object.entries(value).forEach(([key, nested]) => {
        if (key !== "url") collectText(nested, parts);
    });
}

function contentMetrics(blocks) {
    const parts = [];
    collectText(blocks, parts);
    const plainText = parts.join(" ").replace(/\s+/gu, " ").trim();
    const characters = Array.from(plainText).length;
    return {
        characters,
        readingMinutes: characters === 0 ? 0 : Math.max(1, Math.ceil(characters / 2500)),
    };
}

function formatDate(value) {
    if (!value) return "Belum diterbitkan";
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(value));
}

function initials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "BM";
}

function Icon({ name, size = 18 }) {
    const paths = {
        back: <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
        check: <path d="m5 12 4 4L19 6" />,
        cloud: <><path d="M17.5 19H9a7 7 0 1 1 6.7-9h.8a4.5 4.5 0 1 1 1 9Z" /><path d="m9 12 2 2 4-4" /></>,
        error: <><path d="M12 9v4" /><path d="M12 17h.01" /><circle cx="12" cy="12" r="9" /></>,
        eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
        edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
        image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 15-5-5L5 20" /></>,
        more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
        upload: <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></>,
        trash: <><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="m6 7 1 14h10l1-14M9 7V4h6v3" /></>,
        close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    };
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {paths[name] ?? paths.check}
        </svg>
    );
}

function ConfirmDialog({ action, busy, onCancel, onConfirm }) {
    if (!action) return null;
    const copy = {
        publish: ["Terbitkan artikel?", "Artikel akan siap ditampilkan pada halaman publik."],
        deactivate: ["Nonaktifkan artikel?", "Artikel tidak akan tampil di publik sampai diaktifkan kembali."],
        activate: ["Aktifkan kembali artikel?", "Artikel akan kembali tersedia untuk halaman publik."],
        delete: ["Hapus artikel?", "Artikel dihapus dari publik dan slug-nya tidak dapat dipakai artikel lain."],
    }[action];
    return (
        <div className="fixed inset-0 z-80 grid place-items-center bg-[#05130f]/48 p-4 backdrop-blur-[5px]" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
            <div className="relative w-full max-w-[27rem] rounded-2xl border border-white/50 bg-white p-7 shadow-[0_30px_90px_rgba(5,19,15,0.24)]" role="dialog" aria-modal="true" aria-labelledby="article-dialog-title">
                <button className="absolute top-4 right-4 grid size-10 place-items-center rounded-[0.6rem] text-ink-muted transition-colors hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0e3b2e]/35" type="button" onClick={onCancel} aria-label="Tutup dialog"><Icon name="close" /></button>
                <p className="text-[0.6875rem] font-bold tracking-[0.1em] text-[#1e7a53] uppercase">Konfirmasi</p>
                <h2 id="article-dialog-title" className="mt-2 pr-8 text-[1.35rem] font-bold tracking-[-0.025em] text-ink">{copy[0]}</h2>
                <p className="mt-2.5 text-sm leading-6 text-ink-muted">{copy[1]}</p>
                <div className="mt-6 flex justify-end gap-2.5">
                    <button type="button" className="inline-flex min-h-10.5 items-center justify-center rounded-[0.65rem] border border-[#d7dfdb] bg-white px-4 py-2.5 text-[0.8125rem] font-bold text-[#25342f] transition hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-45" onClick={onCancel} disabled={busy}>Batal</button>
                    <button type="button" className={`inline-flex min-h-10.5 items-center justify-center rounded-[0.65rem] px-4 py-2.5 text-[0.8125rem] font-bold text-white transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-45 ${action === "delete" ? "bg-[#a72d2d] hover:bg-[#8c2424]" : "bg-[#0e3b2e] hover:bg-[#144d3d]"}`} onClick={onConfirm} disabled={busy}>
                        {busy ? "Memproses..." : copy[0].replace("?", "")}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ArticleEditor({ config }) {
    const initial = config.article;
    const canWrite = config.capabilities.write;
    const canModerate = config.capabilities.moderate;
    const [articleId, setArticleId] = useState(initial.id);
    const [status, setStatus] = useState(initial.status);
    const [statusLabel, setStatusLabel] = useState(initial.status_label);
    const [title, setTitle] = useState(initial.title || "");
    const [content, setContent] = useState(initial.content || []);
    const [coverUrl, setCoverUrl] = useState(initial.cover_image_url);
    const [coverImageId, setCoverImageId] = useState(null);
    const [removeCover, setRemoveCover] = useState(false);
    const [coverFailed, setCoverFailed] = useState(false);
    const [author, setAuthor] = useState(initial.author);
    const [publishedAt, setPublishedAt] = useState(initial.published_at);
    const [endpoints, setEndpoints] = useState(config.endpoints);
    const [dirty, setDirty] = useState(false);
    const [saveState, setSaveState] = useState("saved");
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState(null);
    const [actionBusy, setActionBusy] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const titleRef = useRef(null);
    const coverInputRef = useRef(null);
    const versionRef = useRef(0);
    const savePromiseRef = useRef(null);
    const immediateSaveRef = useRef(false);
    const stateRef = useRef({});

    const editor = useCreateBlockNote({
        schema: articleSchema,
        initialContent: initial.content?.length ? initial.content : undefined,
        dictionary: {
            ...locales.en,
            multi_column: multiColumnLocales.en,
        },
        dropCursor: multiColumnDropCursor,
        placeholders: { default: 'Mulai tulis artikel... Ketik "/" untuk menambahkan blok.' },
        uploadFile: async (file) => {
            const formData = new FormData();
            formData.append("image", file);
            const uploaded = await requestJson(config.endpoints.upload, { method: "POST", formData });
            return uploaded.url;
        },
    });

    const metrics = useMemo(() => contentMetrics(content), [content]);
    const isDraft = status === "draft";
    const editable = canWrite && !preview;
    const displayCover = coverFailed || !coverUrl ? initial.cover_placeholder_url : coverUrl;

    stateRef.current = {
        articleId,
        status,
        title,
        content,
        coverImageId,
        removeCover,
        endpoints,
        dirty,
    };

    useEffect(() => {
        const editableElement = document.querySelector('[data-article-body] [contenteditable="true"]');
        editableElement?.setAttribute("spellcheck", "false");
    }, [editor]);

    useEffect(() => {
        if (!titleRef.current) return;
        titleRef.current.style.height = "auto";
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }, [title]);

    useEffect(() => {
        setCoverFailed(false);
    }, [coverUrl]);

    useEffect(() => {
        const warn = (event) => {
            if (!dirty || isDraft) return;
            event.preventDefault();
            event.returnValue = "";
        };
        window.addEventListener("beforeunload", warn);
        return () => window.removeEventListener("beforeunload", warn);
    }, [dirty, isDraft]);

    function markChanged({ immediate = false } = {}) {
        versionRef.current += 1;
        setDirty(true);
        setError("");
        if (stateRef.current.status === "draft") {
            immediateSaveRef.current = immediate;
            setSaveState("pending");
        }
    }

    function payloadFromState() {
        const current = stateRef.current;
        return {
            title: current.title,
            content: current.content,
            ...(current.coverImageId ? { cover_image_id: current.coverImageId } : {}),
            ...(current.removeCover ? { remove_cover: true } : {}),
        };
    }

    function applyServerResponse(result, capturedVersion) {
        const article = result.article;
        const mergedEndpoints = { ...stateRef.current.endpoints, ...(result.endpoints || {}) };
        stateRef.current.articleId = article.id;
        stateRef.current.status = article.status;
        stateRef.current.endpoints = mergedEndpoints;
        setArticleId(article.id);
        setStatus(article.status);
        setStatusLabel(article.status_label);
        setCoverUrl(article.cover_image_url);
        setAuthor(article.author);
        setPublishedAt(article.published_at);
        setEndpoints(mergedEndpoints);
        if (result.edit_url && window.location.pathname !== new URL(result.edit_url, window.location.origin).pathname) {
            window.history.replaceState({}, "", result.edit_url);
        }
        if (versionRef.current === capturedVersion) {
            stateRef.current.dirty = false;
            stateRef.current.coverImageId = null;
            stateRef.current.removeCover = false;
            setDirty(false);
            setCoverImageId(null);
            setRemoveCover(false);
            setSaveState("saved");
        }
    }

    async function saveDraft({ force = false } = {}) {
        const current = stateRef.current;
        if (!canWrite || current.status !== "draft" || (!current.dirty && !force)) return null;
        if (savePromiseRef.current) {
            const activeResult = await savePromiseRef.current;
            return stateRef.current.dirty ? saveDraft({ force }) : activeResult;
        }

        const capturedVersion = versionRef.current;
        setSaveState("saving");
        const promise = (async () => {
            const result = await requestJson(
                current.articleId ? current.endpoints.autosave : current.endpoints.draft_store,
                { method: current.articleId ? "PATCH" : "POST", body: payloadFromState() },
            );
            applyServerResponse(result, capturedVersion);
            return result;
        })();
        savePromiseRef.current = promise;
        try {
            return await promise;
        } catch (requestError) {
            setSaveState("error");
            setError(requestError.message);
            throw requestError;
        } finally {
            savePromiseRef.current = null;
        }
    }

    useEffect(() => {
        if (!dirty || !canWrite || status !== "draft") return undefined;
        const delay = immediateSaveRef.current ? 0 : 1000;
        immediateSaveRef.current = false;
        const timeout = window.setTimeout(() => saveDraft().catch(() => {}), delay);
        return () => window.clearTimeout(timeout);
        // State changes are the debounce trigger; saveDraft reads the latest state from a ref.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, content, coverImageId, removeCover, dirty, canWrite, status]);

    function handleTitleChange(event) {
        setTitle(event.target.value.slice(0, 200));
        markChanged();
    }

    function handleEditorChange() {
        setContent(editor.document);
        markChanged();
    }

    async function uploadCover(file) {
        if (!file) return;
        setUploadingCover(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("image", file);
            const uploaded = await requestJson(endpoints.upload, { method: "POST", formData });
            setCoverUrl(uploaded.url);
            setCoverImageId(uploaded.image_id);
            setRemoveCover(false);
            markChanged({ immediate: true });
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setUploadingCover(false);
            if (coverInputRef.current) coverInputRef.current.value = "";
        }
    }

    function clearCover() {
        setCoverUrl(null);
        setCoverImageId(null);
        setRemoveCover(true);
        markChanged({ immediate: true });
    }

    async function updatePublished() {
        setSaveState("saving");
        setError("");
        const capturedVersion = versionRef.current;
        try {
            const result = await requestJson(endpoints.update, { method: "PUT", body: payloadFromState() });
            applyServerResponse(result, capturedVersion);
        } catch (requestError) {
            setSaveState("error");
            setError(requestError.message);
        }
    }

    async function runConfirmedAction() {
        const action = dialogAction;
        setActionBusy(true);
        setError("");
        try {
            if (action === "publish") {
                let savedDraft = null;
                if (stateRef.current.dirty || !stateRef.current.articleId) {
                    savedDraft = await saveDraft({ force: true });
                }
                const publishUrl = savedDraft?.endpoints?.publish || stateRef.current.endpoints.publish || endpoints.publish;
                const result = await requestJson(publishUrl, { method: "POST", body: {} });
                applyServerResponse(result, versionRef.current);
            } else if (action === "delete") {
                const result = await requestJson(endpoints.destroy, { method: "DELETE" });
                window.location.assign(result.redirect_url);
                return;
            } else {
                const result = await requestJson(endpoints[action], { method: "POST", body: {} });
                applyServerResponse(result, versionRef.current);
            }
            setDialogAction(null);
            setMenuOpen(false);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setActionBusy(false);
        }
    }

    const saveCopy = saveState === "saving"
        ? "Menyimpan..."
        : saveState === "error"
            ? "Gagal menyimpan"
            : dirty && !isDraft
                ? "Belum disimpan"
                : "Tersimpan";

    return (
        <div className="min-h-dvh bg-canvas text-ink [background-image:radial-gradient(circle_at_12%_4%,rgba(199,245,155,0.2),transparent_28rem)]">
            <header className="sticky top-0 z-50 grid min-h-18 grid-cols-[1fr_auto_1fr] items-center border-b border-border/90 bg-white/90 px-[clamp(1rem,3vw,2rem)] py-3 backdrop-blur-2xl max-md:min-h-15 max-md:grid-cols-[auto_1fr_auto] max-md:px-3 max-md:py-2">
                <a className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#25342f] transition hover:-translate-x-0.5 hover:text-[#0e3b2e] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0e3b2e]/35" href={endpoints.index} aria-label="Kembali ke daftar artikel">
                    <Icon name="back" />
                    <span className="max-md:hidden">Artikel</span>
                </a>
                <div className={`inline-flex items-center gap-1.5 justify-self-center whitespace-nowrap text-xs font-semibold ${saveState === "error" ? "text-[#b42318]" : "text-ink-muted"}`} role="status">
                    <Icon name={saveState === "error" ? "error" : saveState === "saved" ? "cloud" : "check"} size={16} />
                    <span>{canWrite ? saveCopy : "Mode baca"}</span>
                    {saveState === "error" && isDraft && <button className="underline underline-offset-2 max-md:hidden" type="button" onClick={() => saveDraft({ force: true }).catch(() => {})}>Coba lagi</button>}
                </div>
                <div className="flex items-center justify-end gap-2 max-md:gap-1">
                    <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[0.65rem] border border-transparent px-3 py-2.5 text-[0.8125rem] font-semibold text-[#52625c] transition hover:border-border hover:bg-canvas hover:text-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0e3b2e]/35 max-md:min-h-10 max-md:min-w-10 max-md:p-2" onClick={() => setPreview((value) => !value)}>
                        <Icon name={preview ? "edit" : "eye"} />
                        <span className="max-md:hidden">{preview ? "Kembali edit" : "Preview"}</span>
                    </button>
                    {canModerate && articleId && (
                        <div className="relative">
                            <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[0.65rem] border border-transparent p-2.5 text-[#52625c] transition hover:border-border hover:bg-canvas hover:text-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0e3b2e]/35 max-md:min-h-10 max-md:min-w-10 max-md:p-2" onClick={() => setMenuOpen((value) => !value)} aria-label="Buka menu artikel" aria-expanded={menuOpen}>
                                <Icon name="more" />
                            </button>
                            {menuOpen && (
                                <div className="absolute top-[calc(100%+0.5rem)] right-0 z-60 min-w-52 rounded-xl border border-border bg-white p-1.5 shadow-[0_18px_48px_rgba(14,37,28,0.12)]">
                                    {status === "terbit" && <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[0.8125rem] font-semibold text-[#25342f] transition hover:bg-canvas" onClick={() => setDialogAction("deactivate")}>Nonaktifkan artikel</button>}
                                    {status === "nonaktif" && <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[0.8125rem] font-semibold text-[#25342f] transition hover:bg-canvas" onClick={() => setDialogAction("activate")}>Aktifkan kembali</button>}
                                    <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[0.8125rem] font-semibold text-[#b42318] transition hover:bg-[#fff1f0]" onClick={() => setDialogAction("delete")}><Icon name="trash" size={15} /> Hapus artikel</button>
                                </div>
                            )}
                        </div>
                    )}
                    {canWrite && isDraft && (
                        <button type="button" className="inline-flex min-h-10.5 items-center justify-center rounded-[0.65rem] bg-[#0e3b2e] px-4 py-2.5 text-[0.8125rem] font-bold text-white transition hover:-translate-y-px hover:bg-[#144d3d] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0e3b2e]/35 max-md:min-h-10 max-md:px-3" onClick={() => setDialogAction("publish")}>Terbitkan</button>
                    )}
                    {canWrite && !isDraft && (
                        <button type="button" className="inline-flex min-h-10.5 items-center justify-center rounded-[0.65rem] bg-[#0e3b2e] px-4 py-2.5 text-[0.8125rem] font-bold text-white transition hover:-translate-y-px hover:bg-[#144d3d] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0e3b2e]/35 max-md:min-h-10 max-md:px-3" onClick={updatePublished} disabled={!dirty || saveState === "saving"}>Update</button>
                    )}
                </div>
            </header>

            {error && <div className="fixed top-21 left-1/2 z-45 flex w-[min(34rem,calc(100%-2rem))] -translate-x-1/2 items-center gap-2.5 rounded-xl border border-[#f2b8b5] bg-[#fff1f0]/97 px-4 py-3 text-[0.8125rem] font-semibold text-[#8c2424] shadow-[0_16px_42px_rgba(121,31,31,0.12)] max-md:top-17.5" role="alert"><Icon name="error" /><span>{error}</span></div>}

            <main>
                <article className={`mx-auto overflow-clip border border-border bg-white ${preview ? "shadow-none" : "shadow-[0_30px_80px_rgba(14,59,46,0.07)]"} max-md:border-0 max-md:shadow-none`}>
                    <section className="group/hero relative min-h-[31rem] overflow-hidden bg-[#16372d] text-white md:max-xl:min-h-[25rem] max-md:min-h-[29rem]">
                        <img
                            src={displayCover}
                            alt={coverUrl && !coverFailed ? title : ""}
                            className="absolute inset-0 size-full object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                            onError={() => setCoverFailed(true)}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(14,59,46,0.08),rgba(5,19,15,0.22)_50%),linear-gradient(to_top,rgba(5,19,15,0.96)_0%,rgba(5,19,15,0.58)_38%,rgba(5,19,15,0.08)_78%)]" />
                        {editable && (
                            <div className="absolute top-6 right-6 z-4 flex -translate-y-1 gap-2 opacity-0 transition duration-200 group-hover/hero:translate-y-0 group-hover/hero:opacity-100 focus-within:translate-y-0 focus-within:opacity-100 max-md:top-4 max-md:right-4 max-md:translate-y-0 max-md:opacity-100">
                                <button type="button" className="inline-flex min-h-10 items-center gap-2 rounded-[0.6rem] border border-white/30 bg-[#05130f]/65 px-3 py-2 text-xs font-bold text-white backdrop-blur-xl transition hover:bg-[#0e3b2e]/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/70 max-md:min-w-10 max-md:px-2.5" onClick={() => coverInputRef.current?.click()} disabled={uploadingCover}>
                                    <Icon name={coverUrl ? "image" : "upload"} size={16} />
                                    <span className="max-md:hidden">{uploadingCover ? "Mengunggah..." : coverUrl ? "Ganti cover" : "Tambah cover"}</span>
                                </button>
                                {coverUrl && <button type="button" className="inline-flex min-h-10 items-center rounded-[0.6rem] border border-white/30 bg-[#05130f]/65 px-3 py-2 text-xs font-bold text-white backdrop-blur-xl transition hover:bg-[#0e3b2e]/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/70 max-md:px-2.5 max-md:text-[0.6875rem]" onClick={clearCover}>Hapus</button>}
                                <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={(event) => uploadCover(event.target.files?.[0])} hidden />
                            </div>
                        )}
                        <div className="absolute right-[clamp(1.5rem,5vw,4rem)] bottom-30 left-[clamp(1.5rem,5vw,4rem)] z-3 max-w-240 max-md:top-1/2 max-md:right-5 max-md:bottom-auto max-md:left-5 max-md:-translate-y-1/2 max-md:text-center">
                            <span className="mb-3.5 inline-flex rounded-[0.35rem] border border-white/30 bg-white/12 px-2 py-1.5 text-[0.6875rem] font-bold tracking-[0.1em] text-white/90 uppercase backdrop-blur-lg">{statusLabel}</span>
                            <textarea
                                ref={titleRef}
                                className={`block min-h-[1.2em] w-full resize-none overflow-hidden border-0 bg-transparent font-sans text-[clamp(2.75rem,5.2vw,4.75rem)] leading-[1.04] font-bold tracking-[-0.045em] text-white [text-wrap:balance] placeholder:text-white/60 focus:outline-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/60 max-xl:text-[clamp(2.4rem,6vw,3.5rem)] max-md:text-center max-md:text-[2rem] max-md:leading-[1.12] max-md:tracking-[-0.035em] ${preview ? "pointer-events-none" : ""}`}
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Tulis judul artikel..."
                                maxLength={200}
                                rows={1}
                                readOnly={!editable}
                                aria-label="Judul artikel"
                            />
                        </div>
                        <div className="absolute right-0 bottom-0 left-0 z-3 flex min-h-23 items-center justify-between gap-6 border-t border-white/12 bg-[#05130f]/72 px-[clamp(1.5rem,5vw,4rem)] py-4.5 backdrop-blur-2xl max-md:min-h-22 max-md:px-5 max-md:py-4">
                            <div className="flex min-w-0 items-center gap-3">
                                {author.photo_url ? <img className="size-10.5 shrink-0 rounded-xl border border-white/30 bg-white/15 object-cover" src={author.photo_url} alt="" /> : <span className="grid size-10.5 shrink-0 place-items-center rounded-xl border border-white/30 bg-white/15 text-xs font-bold text-white">{initials(author.name)}</span>}
                                <div className="grid min-w-0 gap-0.5"><strong className="truncate text-xs font-bold">{author.name}</strong><small className="text-[0.6875rem] text-white/65 max-md:max-w-40 max-md:truncate">{formatDate(publishedAt)}</small></div>
                            </div>
                            <div className="flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.06em] text-white/85 uppercase max-md:text-[0.625rem]"><span className="size-2.5 rounded-full border-2 border-primary-400 shadow-[0_0_0_3px_rgba(126,230,37,0.12)]" />{metrics.readingMinutes} menit baca</div>
                        </div>
                    </section>

                    <section className="md:px-[clamp(1.25rem,5vw,4rem)] pt-15 pb-22 max-md:px-0 max-md:[&_.bn-editor]:!px-8 max-md:pt-10 max-md:pb-18">
                        <div
                            data-article-body
                            className="
                            mx-auto 
                            w-full 
                            max-w-[47.5rem] [&_.bn-container]:font-sans [&_.bn-editor]:min-h-80 [&_.bn-editor]:bg-transparent [&_.bn-editor]:px-0 max-md:[&_.bn-editor]:px-0.5 [&_.bn-editor]:text-[19px] [&_.bn-editor]:leading-[1.8] [&_.bn-editor]:text-[#25342f] [&_.bn-block-content[data-content-type='paragraph']]:text-[19px] [&_.bn-inline-content]:text-[19px] max-md:[&_.bn-editor]:text-[19px] max-md:[&_.bn-editor]:leading-7 [&_.bn-block-content[data-content-type='heading']]:text-ink [&_.bn-block-content[data-content-type='heading']]:tracking-[-0.025em] [&_h2]:mt-10 [&_h2]:text-[clamp(1.65rem,3vw,2.15rem)] [&_h2]:leading-[1.2] [&_h3]:mt-8 [&_h3]:text-[clamp(1.3rem,2.4vw,1.55rem)] [&_h3]:leading-[1.3] [&_blockquote]:border-l-[3px] [&_blockquote]:border-[#0e3b2e] [&_blockquote]:text-[19px] [&_blockquote]:leading-[1.65] [&_blockquote]:font-medium [&_blockquote]:text-[#16372d] [&_[data-content-type='quote']]:border-l-[3px] [&_[data-content-type='quote']]:border-[#0e3b2e] [&_[data-content-type='quote']]:text-[19px] [&_[data-content-type='quote']]:leading-[1.65] [&_[data-content-type='quote']]:font-medium [&_[data-content-type='quote']]:text-[#16372d] [&_img]:rounded-xl [&_.bn-block-column-list]:gap-4 [&_.bn-block-column]:min-w-0 max-md:[&_.bn-block-column-list]:flex-col [&_.bn-side-menu]:-translate-x-1.5 [&_.bn-formatting-toolbar]:border-[#d7dfdb] [&_.bn-formatting-toolbar]:shadow-[0_12px_36px_rgba(14,59,46,0.12)]"
                        >
                            <BlockNoteView
                                editor={editor}
                                onChange={handleEditorChange}
                                editable={editable}
                                theme="light"
                                slashMenu={false}
                                sideMenu={editable}
                                formattingToolbar={editable}
                                filePanel={editable}
                                tableHandles={editable}
                            >
                                {editable && (
                                    <SuggestionMenuController
                                        triggerCharacter="/"
                                        getItems={async (query) => {
                                            const defaultItems = getDefaultReactSlashMenuItems(editor).filter((item) => {
                                                const label = `${item.title || ""} ${(item.aliases || []).join(" ")}`.toLowerCase();
                                                return !label.includes("heading 1") && !/(^|\s)h1($|\s)/.test(label);
                                            });

                                            return filterSuggestionItems(
                                                combineByGroup(defaultItems, getMultiColumnSlashMenuItems(editor)),
                                                query,
                                            );
                                        }}
                                    />
                                )}
                            </BlockNoteView>
                        </div>
                    </section>
                </article>
            </main>

            <ConfirmDialog action={dialogAction} busy={actionBusy} onCancel={() => !actionBusy && setDialogAction(null)} onConfirm={runConfirmedAction} />
        </div>
    );
}

function mountArticleEditor() {
    const root = document.querySelector("[data-article-editor-root]");
    const data = document.getElementById("article-editor-data");
    if (!root || !data || root.dataset.mounted === "true") return;
    root.dataset.mounted = "true";
    createRoot(root).render(<ArticleEditor config={JSON.parse(data.textContent)} />);
}

document.addEventListener("DOMContentLoaded", mountArticleEditor);
