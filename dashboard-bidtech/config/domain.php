<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Harga domain (IDR per tahun, sudah termasuk PPN 11%)
    |--------------------------------------------------------------------------
    |
    | Ekstensi yang dijual lewat IDCloudHost beserta harga katalognya. Urutan = prioritas
    | tampil di hasil pencarian. Dipakai sebagai harga bawaan dan cadangan bila API harga
    | IDCloudHost tidak tersedia.
    |
    */
    'extensions' => [
        'com'       => 238650,
        'id'        => 222000,
        'co.id'     => 310800,
        'my.id'     => 5550,
        'online'    => 25000,
        'site'      => 25000,
        'store'     => 35000,
        'tech'      => 45000,
        'net'       => 288600,
        'xyz'       => 321900,
        'biz.id'    => 5550,
        'web.id'    => 5550,
        'org'       => 215000,
        'info'      => 75000,
        'shop'      => 55000,
        'live'      => 55000,
        'space'     => 35000,
        'website'   => 35000,
        'app'       => 250000,
        'dev'       => 250000,
        'io'        => 650000,
        'me'        => 280000,
        'org.id'    => 222000,
        'or.id'     => 51060,
        'ac.id'     => 51060,
        'sch.id'    => 51060,
        'ponpes.id' => 51060,
        'desa.id'   => 222000,
        'mil.id'    => 222000,
        'go.id'     => 222000,
    ],

    // Harga per tahun bila ekstensi domain tidak ada di daftar di atas.
    'default_price' => 185000,

    /*
    | Markup Bidtech (Rupiah) yang ditambahkan di atas harga IDCloudHost sebelum ditampilkan ke pembeli.
    | Harga dasar dari IDCloudHost (grand_total_idr) SUDAH termasuk PPN 11%; markup ditambahkan di atasnya.
    */
    'markup' => 0,

];
