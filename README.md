# PDF Watermark Generator - Loker Kendari Official

Script Python untuk membuat dokumen PDF dengan watermark penuh halaman yang rapi dan responsif. Watermark "Loker Kendari Official" muncul secara diagonal, transparan, dan tidak mengganggu teks utama.

## Cara Kerja

- HTML + CSS mendesain lapisan watermark dengan `position: absolute`, `opacity: 0.15`, dan `transform: rotate(-25deg)`.
- Teks watermark diulang dengan pola selang-seling (`shift`) untuk memenuhi seluruh halaman A4.
- WeasyPrint mengkonversi HTML ke PDF dengan presisi tinggi (ukuran kertas, margin, nomor halaman otomatis).

## Instalasi

1. Pastikan Python 3.8+ terinstal.
2. Install dependency:
   ```bash
   pip install -r requirements.txt