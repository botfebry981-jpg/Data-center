from weasyprint import HTML

# Template HTML + CSS dengan watermark responsif
html_content = """
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dokumen Berwatermark Full</title>
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
        }
        
        @page {
            size: A4;
            margin: 20mm 15mm;
            background-color: #ffffff;
            
            @bottom-right {
                content: counter(page);
                font-family: Arial, sans-serif;
                font-size: 9pt;
                color: #888888;
            }
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333333;
            position: relative;
        }

        /* Lapisan watermark (penuh halaman) */
        .watermark-bg {
            position: absolute;
            top: -10mm;
            left: -10mm;
            width: 190mm;
            height: 260mm;
            z-index: -1000;
            pointer-events: none;
            overflow: hidden;
            opacity: 0.15;
            transform: rotate(-25deg);
            transform-origin: center center;
        }

        .watermark-line {
            display: block;
            white-space: nowrap;
            font-family: Arial, sans-serif;
            font-size: 26pt;
            font-weight: bold;
            color: #b0b0b0;
            margin-bottom: 45px;
            letter-spacing: 5px;
        }
        
        .watermark-line.shift {
            margin-left: 80px;
        }

        .content {
            position: relative;
            z-index: 10;
        }
        
        h1 {
            font-size: 18pt;
            color: #2c3e50;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 8px;
            margin-top: 0;
            margin-bottom: 20px;
        }

        p {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>

    <div class="watermark-bg">
        <div class="watermark-line">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line shift">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line shift">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line shift">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line shift">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
        <div class="watermark-line shift">Loker Kendari Official &nbsp;&nbsp;&nbsp;&nbsp; Loker Kendari Official</div>
    </div>

    <div class="content">
        <h1>Dokumen Resmi</h1>
        <p>Ini adalah contoh paragraf pertama. Teks utama tetap terbaca jelas di atas watermark.</p>
        <p>Watermark menggunakan opacity rendah (0.15) dan rotasi diagonal sehingga memenuhi seluruh halaman A4 tanpa mengganggu keterbacaan konten.</p>
        <p>Anda dapat menambahkan lebih banyak teks, tabel, atau gambar di sini. CSS akan mengatur tata letak yang rapi.</p>
        <p style="margin-top: 30px;"><strong>Loker Kendari Official</strong> – Solusi lowongan kerja terpercaya.</p>
    </div>

</body>
</html>
"""

# Simpan HTML sementara
with open("temp_watermark.html", "w", encoding="utf-8") as f:
    f.write(html_content)

# Konversi ke PDF
print("📄 Memproses PDF dengan watermark...")
HTML("temp_watermark.html").write_pdf("Hasil_Loker_Kendari.pdf")
print("✅ Selesai! File 'Hasil_Loker_Kendari.pdf' telah diunduh (tersimpan di folder yang sama).")