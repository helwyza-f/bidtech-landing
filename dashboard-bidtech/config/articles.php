<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Tipe blok BlockNote yang diizinkan di isi artikel
    |--------------------------------------------------------------------------
    |
    | Dicek terhadap @blocknote/core versi 0.55 (lihat defaultBlocks.d.ts di paket
    | terpasang). "quote" adalah nama resmi blok kutipan di versi ini, sesuai
    | keputusan spec bagian 6 yang mengizinkan blockquote. columnList dan column
    | berasal dari @blocknote/xl-multi-column. Blok lain di luar daftar ini
    | (audio, video, file, codeBlock, toggleListItem) sengaja tidak
    | diizinkan dulu karena di luar cakupan spec Fase 1.
    |
    */
    'allowed_block_types' => [
        'paragraph',
        'heading',
        'bulletListItem',
        'numberedListItem',
        'quote',
        'image',
        'divider',
        'table',
        'columnList',
        'column',
    ],

    // Level heading yang boleh dipakai di isi artikel. H1 dilarang (judul H1 diisi manual terpisah).
    'allowed_heading_levels' => [2, 3],

    // Fallback visual untuk cover kosong maupun gambar yang gagal dimuat.
    'cover_placeholder_url' => 'https://media.bidtech.co.id/bidtech/blog/placeholder.webp',

    /*
    |--------------------------------------------------------------------------
    | Unggah gambar artikel melalui Laravel ke RustFS
    |--------------------------------------------------------------------------
    */
    'image_upload' => [
        // JPG, PNG, WebP, AVIF, GIF diizinkan. SVG sengaja tidak — risiko skrip [Diputuskan].
        'allowed_mimes' => [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/avif',
            'image/gif',
        ],
        // Batas ukuran unggahan gambar: 10 MB [Diputuskan].
        'max_size_kb' => 10 * 1024,
        // File yang lolos validasi langsung disimpan pada prefix final.
        'final_prefix' => 'articles',
    ],
];
