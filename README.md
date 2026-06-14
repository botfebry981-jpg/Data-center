
# PDF Generator dengan Watermark "Loker Kendari Official"

Script ini menghasilkan file PDF dengan watermark **Loker Kendari Official** di setiap halaman.  
**Letak semua kode:** folder `file/`  
**Hasil PDF:** folder `file/pdf/`

## Cara Menjalankan

1. Masuk ke folder `file/`:
   ```bash
   cd file
2 Install dependensi:pip install -r requirements.txt
3 jalankan script:python generate_pdf.py
4. File PDF akan muncul di file/pdf/Hasil_Loker_Kendari.pdf


---

### 4. `file/.gitignore`


---

### 5. `file/index.html`

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loker Kendari - Watermark PDF Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🖨️ Generator PDF dengan Watermark</h1>
            <p>Demo interaktif watermark "Loker Kendari Official"</p>
        </header>
        <div class="demo-area">
            <div class="controls">
                <h3>⚙️ Pengaturan Watermark</h3>
                <div class="control-group">
                    <label for="watermarkText">Teks Watermark:</label>
                    <input type="text" id="watermarkText" value="Loker Kendari Official">
                </div>
                <div class="control-group">
                    <label for="opacity">Opacitas (0-1):</label>
                    <input type="range" id="opacity" min="0" max="1" step="0.01" value="0.15">
                    <span id="opacityValue">0.15</span>
                </div>
                <div class="control-group">
                    <label for="rotation">Rotasi (deg):</label>
                    <input type="range" id="rotation" min="-45" max="45" step="1" value="-25">
                    <span id="rotationValue">-25°</span>
                </div>
                <div class="control-group">
                    <label for="fontSize">Ukuran Font:</label>
                    <input type="range" id="fontSize" min="14" max="40" step="1" value="26">
                    <span id="fontSizeValue">26pt</span>
                </div>
                <button id="downloadPdfBtn" class="btn">📄 Unduh PDF (Backend)</button>
                <p class="info-note">Jalankan `python generate_pdf.py` di folder file/</p>
            </div>
            <div class="preview">
                <h3>👁️ Preview Efek Watermark</h3>
                <div class="watermark-container">
                    <div class="watermark-layer" id="watermarkLayer"></div>
                    <div class="content-layer">
                        <h2>Dokumen Resmi (Preview)</h2>
                        <p>Ini contoh teks utama. Watermark muncul di latar belakang.</p>
                     </div>
                </div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>