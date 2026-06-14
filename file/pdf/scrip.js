// Elemen DOM
const fileNameInput = document.getElementById('pdfFileName');
const textInput = document.getElementById('jobTextInput');
const previewDiv = document.getElementById('livePreview');
const generateBtn = document.getElementById('generateBtn');

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

// Format teks mentah menjadi HTML gaya lowongan
function formatTextToJobHTML(rawText) {
    if (!rawText.trim()) return '<p><em>Kosong — tulis teks lowongan di kolom kiri</em></p>';
    
    let lines = rawText.split(/\r?\n/);
    let output = "";
    let bulletItems = [];
    let currentSectionTitle = "";
    let inBullet = false;
    let mainTitle = "";
    let subLocation = "";
    
    function flushBulletSection() {
        if (bulletItems.length === 0) return;
        let html = `<div class="section-title-preview">${escapeHtml(currentSectionTitle)}</div>`;
        html += `<ul class="custom-list">`;
        bulletItems.forEach(item => {
            html += `<li>${escapeHtml(item)}</li>`;
        });
        html += `</ul>`;
        output += html;
        bulletItems = [];
        inBullet = false;
    }
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === "") continue;
        
        if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
            let cleanItem = line.replace(/^[-•*]\s*/, '');
            if (!inBullet) {
                if (currentSectionTitle === "") currentSectionTitle = "KETERANGAN";
                inBullet = true;
            }
            bulletItems.push(cleanItem);
        } 
        else {
            if (inBullet) {
                flushBulletSection();
                inBullet = false;
            }
            
            let isSectionTitle = false;
            if (line.length < 60 && (line === line.toUpperCase() || line.endsWith(':'))) {
                isSectionTitle = true;
                let titleClean = line.replace(/:$/, '');
                currentSectionTitle = titleClean;
                let nextLine = (i+1 < lines.length) ? lines[i+1].trim() : "";
                if (nextLine.startsWith('-') || nextLine.startsWith('•') || nextLine.startsWith('*')) {
                    continue;
                } else {
                    output += `<div class="section-title-preview">${escapeHtml(titleClean)}</div>`;
                    currentSectionTitle = "";
                }
            }
            else {
                if (output === "" && !mainTitle) {
                    mainTitle = line;
                    output += `<div class="job-header-preview"><h2>${escapeHtml(mainTitle)}</h2>`;
                    let potentialLoc = (i+1 < lines.length) ? lines[i+1].trim() : "";
                    if (potentialLoc && !potentialLoc.startsWith('-') && potentialLoc !== potentialLoc.toUpperCase()) {
                        subLocation = potentialLoc;
                        output += `<div class="job-location">📍 ${escapeHtml(subLocation)}</div>`;
                        i++;
                    } else {
                        output += `<div class="job-location">📍 Lokasi tersedia</div>`;
                    }
                    output += `</div>`;
                }
                else {
                    output += `<p style="margin: 8px 0;">${escapeHtml(line)}</p>`;
                }
            }
        }
    }
    
    if (inBullet) flushBulletSection();
    
    if (output === "") {
        output = `<div class="job-header-preview"><h2>${escapeHtml(rawText.substring(0,60))}</h2><div class="job-location">📍 Lowongan</div></div>`;
    }
    
    let lower = rawText.toLowerCase();
    if (lower.includes('wa') || lower.includes('whatsapp') || /08[0-9]{8,11}/.test(rawText)) {
        let waMatch = rawText.match(/08[0-9]{8,11}/);
        if (waMatch) {
            output += `<div class="contact-box-preview">📞 Kirim ke WhatsApp: ${waMatch[0]}</div>`;
        } else {
            output += `<div class="contact-box-preview">📞 Hubungi via WhatsApp (lihat detail di atas)</div>`;
        }
    }
    
    output += `<div class="footer-preview">⚡ SEGERA DAFTARKAN DIRIMU! ⚡<br>Loker Kendari Official</div>`;
    output += `<hr><div class="note-small">* Dokumen resmi lowongan pekerjaan</div>`;
    return output;
}

// Update preview
function updatePreview() {
    let rawText = textInput.value;
    if (rawText.trim() === "") {
        rawText = `DIBUTUHKAN STAFF WANITA UNTUK JAGA KIOS FOTOCOPY
DI DEPAN KAMPUS UNSULTRA BARUGA

KUALIFIKASI:
- Usia Maksimal 30 Tahun
- Pendidikan Minimal SMA Sederajat
- Tidak Sedang Kuliah
- Belum Menikah
- Mampu Mengoperasikan Komputer (Minimal Microsoft Word)
- Berdomisili Tempat Tinggal di Baruga
- Jujur, Disiplin dan Bertanggung Jawab

SYARAT BERKAS:
- Pasfoto Ukuran 3x4
- CV, KTP, KK, Ijazah

CATATAN PENGIRIMAN:
Semua Berkas dijadikan Satu File PDF dan dikirimkan langsung melalui WhatsApp ke nomor: 0821 8841 1841`;
        textInput.value = rawText;
    }
    previewDiv.innerHTML = formatTextToJobHTML(rawText);
}

// Download PDF
async function downloadPDF() {
    const originalPreview = document.getElementById('livePreview');
    const cloneDiv = originalPreview.cloneNode(true);
    cloneDiv.style.padding = "20px";
    cloneDiv.style.backgroundColor = "white";
    cloneDiv.style.width = "210mm";
    cloneDiv.style.margin = "0 auto";
    cloneDiv.style.fontFamily = "'Times New Roman', Georgia, serif";
    
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(cloneDiv);
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    document.body.appendChild(tempContainer);
    
    let fileName = fileNameInput.value.trim();
    if (fileName === "") fileName = "lowongan_pekerjaan";
    const safeName = fileName.replace(/[\\/:*?"<>|]/g, '_') + ".pdf";
    
    const opt = {
        margin:        [0.5, 0.5, 0.5, 0.5],
        filename:      safeName,
        image:         { type: 'jpeg', quality: 0.98 },
        html2canvas:   { scale: 2, letterRendering: true },
        jsPDF:         { unit: 'in', format: 'a4', orientation: 'portrait' }
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
generateBtn.addEventListener('click', downloadPDF);
updatePreview();