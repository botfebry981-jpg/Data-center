// DOM elements
const fileNameInput = document.getElementById('pdfFileName');
const textInput = document.getElementById('jobTextInput');
const previewDiv = document.getElementById('livePreview');
const downloadBtn = document.getElementById('downloadBtn');

// Escape HTML
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Fungsi memformat teks mentah menjadi struktur HTML dengan watermark
function formatToWatermarkHTML(rawText) {
    if (!rawText.trim()) {
        rawText = `PENGUMUMAN LOWONGAN KERJA
Nomor: 042/LKO/INFO/2026
Perihal: Penerimaan Karyawan Baru

Dengan hormat,

Sehubungan dengan perkembangan ekspansi bisnis kami di wilayah Kendari dan sekitarnya, Loker Kendari Official membuka kesempatan berkarir bagi putra-putri daerah terbaik untuk bergabung bersama tim kami. Kami mencari individu yang dinamis, jujur, dan berdedikasi tinggi.

Posisi yang Dibutuhkan:
- Content Creator / Social Media Specialist
- Administrative Assistant
- Customer Relation Officer

Persyaratan Umum:
- Pria/Wanita, usia maksimal 28 tahun.
- Pendidikan minimal Diploma (D3) atau Sarjana (S1) semua jurusan.
- Mampu berkomunikasi dengan baik dan bekerja dalam tim.
- Menguasai penggunaan komputer dasar (MS Office) dan aplikasi media sosial.
- Domisili di Kota Kendari dan sekitarnya.

Surat lamaran beserta CV dan dokumen pendukung dapat dikirimkan langsung melalui email resmi perusahaan kami paling lambat akhir bulan ini. Hanya kandidat yang memenuhi kualifikasi yang akan diproses ke tahap wawancara.

Kendari, Juni 2026

Manajemen Loker Kendari`;
        textInput.value = rawText;
    }
    
    const lines = rawText.split(/\r?\n/);
    let title = "";
    let metaNomor = "";
    let metaPerihal = "";
    let paragraphs = [];
    let currentList = null;
    let listItems = [];
    let afterList = false;
    
    // parsing sederhana
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === "") continue;
        
        // Deteksi judul (baris pertama atau baris ALL CAPS panjang)
        if (title === "" && (line === line.toUpperCase() || i === 0)) {
            title = line;
            continue;
        }
        // Deteksi meta Nomor:
        if (line.toLowerCase().startsWith("nomor:")) {
            metaNomor = line.substring(6).trim();
            continue;
        }
        if (line.toLowerCase().startsWith("perihal:")) {
            metaPerihal = line.substring(8).trim();
            continue;
        }
        // Deteksi bullet list (diawali "-" atau "•")
        if (line.startsWith('-') || line.startsWith('•')) {
            let cleanItem = line.replace(/^[-•]\s*/, '');
            if (!currentList) {
                currentList = [];
            }
            currentList.push(cleanItem);
            continue;
        } else {
            if (currentList) {
                paragraphs.push({ type: 'ul', items: currentList });
                currentList = null;
            }
            // baris biasa -> paragraf
            paragraphs.push({ type: 'p', text: line });
        }
    }
    if (currentList) {
        paragraphs.push({ type: 'ul', items: currentList });
    }
    
    // Build HTML content
    let contentHtml = `<div class="content-container">`;
    contentHtml += `<h1>${escapeHtml(title)}</h1>`;
    if (metaNomor || metaPerihal) {
        contentHtml += `<div class="meta-info">`;
        if (metaNomor) contentHtml += `<strong>Nomor:</strong> ${escapeHtml(metaNomor)}<br>`;
        if (metaPerihal) contentHtml += `<strong>Perihal:</strong> ${escapeHtml(metaPerihal)}`;
        contentHtml += `</div>`;
    }
    
    for (let block of paragraphs) {
        if (block.type === 'p') {
            contentHtml += `<p>${escapeHtml(block.text)}</p>`;
        } else if (block.type === 'ul') {
            contentHtml += `<ul>`;
            block.items.forEach(item => {
                contentHtml += `<li>${escapeHtml(item)}</li>`;
            });
            contentHtml += `</ul>`;
        }
    }
    
    // Tambahkan tanda tangan jika tidak ada di teks
    if (!rawText.includes("Manajemen") && !rawText.includes("Kendari,")) {
        contentHtml += `<div class="signature">Kendari, ${new Date().toLocaleDateString('id-ID', { year:'numeric', month:'long'})}<br><br><br><strong>Manajemen Loker Kendari</strong></div>`;
    }
    contentHtml += `</div>`;
    
    // Gabungkan dengan watermark grid
    const watermarkHtml = `
        <div class="watermark-grid">
            ${Array(8).fill().map(() => `
                <div class="watermark-cell"><div class="watermark-text">LOKER KENDARI OFFICIAL</div></div>
            `).join('')}
        </div>
    `;
    
    return watermarkHtml + contentHtml;
}

// Update preview
function updatePreview() {
    const rawText = textInput.value;
    const fullHtml = formatToWatermarkHTML(rawText);
    previewDiv.innerHTML = fullHtml;
}

// Download PDF (clone area preview)
async function downloadPDF() {
    const originalPreview = document.getElementById('livePreview');
    const cloneDiv = originalPreview.cloneNode(true);
    // pastikan ukuran dan padding untuk cetak
    cloneDiv.style.width = "210mm";
    cloneDiv.style.minHeight = "297mm";
    cloneDiv.style.padding = "20mm";
    cloneDiv.style.backgroundColor = "white";
    cloneDiv.style.margin = "0";
    
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(cloneDiv);
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    document.body.appendChild(tempContainer);
    
    let fileName = fileNameInput.value.trim();
    if (fileName === "") fileName = "lowongan_watermark";
    const safeName = fileName.replace(/[\\/:*?"<>|]/g, '_') + ".pdf";
    
    const opt = {
        margin:        [0, 0, 0, 0], // karena sudah ada padding di dalam clone
        filename:      safeName,
        image:         { type: 'jpeg', quality: 0.98 },
        html2canvas:   { scale: 2, letterRendering: true },
        jsPDF:         { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    try {
        await html2pdf().set(opt).from(cloneDiv).save();
    } catch(e) {
        alert("Gagal generate PDF: " + e.message);
    } finally {
        document.body.removeChild(tempContainer);
    }
}

textInput.addEventListener('input', updatePreview);
downloadBtn.addEventListener('click', downloadPDF);
updatePreview();