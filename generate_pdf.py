"""
PDF Generator dengan Watermark "Loker Kendari Official"
Semua file berada di folder 'file/'
Hasil PDF disimpan di folder 'file/pdf/'
"""

import os
from weasyprint import HTML

# Konfigurasi watermark
WATERMARK_TEXT = "Loker Kendari Official"
WATERMARK_OPACITY = 0.15
WATERMARK_ROTATION = -25
WATERMARK_FONT_SIZE = "26pt"
WATERMARK_COLOR = "#b0b0b0"

HTML_TEMPLATE = f"""
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dokumen Berwatermark</title>
    <style>
        * {{
            box-sizing: border-box;
        }}
        @page {{
            size: A4;
            margin: 20mm 15mm;
            background-color: #ffffff;
            @bottom-right {{
                content: counter(page);
                font-family: Arial, sans-serif;
                font-size: 9pt;
                color: #888888;
            }}
        }}
        body {{
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333333;
            background-color: #ffffff;
            position: relative;
        }}
        .watermark-bg {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1000;
            pointer-events: none;
            overflow: hidden;
            opacity: {WATERMARK_OPACITY};
            transform: rotate({WATERMARK_ROTATION}deg);
            transform-origin: center center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }}
        .watermark-line {{
            display: block;
            white-space: nowrap;
            font-family: Arial, sans-serif;
            font-size: {WATERMARK_FONT_SIZE};
            font-weight: bold;
            color: {WATERMARK_COLOR};
            margin-bottom: 45px;
            letter-spacing: 5px;
        }}
        .watermark-line.shift {{
            margin-left: 80px;
        }}
        .content {{
            position: relative;
            z-index: 10;
        }}
        h1 {{
            font-size: 18pt;
            color: #2c3e50;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 8px;
        }}
        p {{
            margin-bottom: 15px;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }}
        th, td {{
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }}
        th {{
            background-color: #f2f2f2;
        }}
    </style>
</head>
<body>
    <div class="watermark-bg">
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line shift">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line shift">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line shift">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line shift">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line shift">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line shift">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line shift">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
        <div class="watermark-line">{WATERMARK_TEXT} &nbsp;&nbsp;&nbsp;&nbsp; {WATERMARK_TEXT}</div>
    </div>
    <div class="content">
        <h1>Dokumen Resmi</h1>
        <p>Ini adalah contoh dokumen dengan watermark "Loker Kendari Official" yang muncul secara otomatis di setiap halaman. Watermark diputar diagonal, transparan, dan tidak mengganggu teks utama.</p>
        <p>Anda dapat menambahkan paragraf, tabel, gambar, atau elemen HTML lainnya di sini.</p>
        <h2>Contoh Tabel</h2>
        <table>
            <thead><tr><th>No</th><th>Nama</th><th>Keterangan</th></tr></thead>
            <tbody><tr><td>1</td><td>Contoh Data 1</td><td>Lorem ipsum</td></tr>
            <tr><td>2</td><td>Contoh Data 2</td><td>Dolor sit amet</td></tr></tbody>
        </table>
        <p style="margin-top: 30px;">Halaman ini akan menampilkan watermark yang sama pada setiap lembar PDF yang dihasilkan.</p>
    </div>
</body>
</html>
"""

def generate_pdf(output_filename="Hasil_Loker_Kendari.pdf"):
    # Direktori tujuan: subfolder 'pdf' di dalam folder yang sama dengan script
    output_dir = "pdf"
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, output_filename)
    print(f"Sedang memproses PDF -> {output_path} ...")
    HTML(string=HTML_TEMPLATE).write_pdf(output_path)
    print(f"Selesai! File '{output_path}' berhasil dibuat.")

if __name__ == "__main__":
    generate_pdf("Hasil_Loker_Kendari.pdf")