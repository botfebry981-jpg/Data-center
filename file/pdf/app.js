document.getElementById('download-btn').addEventListener('click', () => {
    const judul = document.getElementById('judul-input').value;
    const kontenMentah = document.getElementById('konten-textarea').value;

    // 1. Logika mendeteksi kata "watermark" di dalam teks
    let teksBersih = kontenMentah;
    let teksWatermark = "";

    // Cari apakah ada pola "watermark [Nama] di latar belakang"
    const regexWatermark = /watermark\s+([\w\s]+?)(?=\s+di|\.|$)/i;
    const match = kontenMentah.match(regexWatermark);

    if (match && match[1]) {
        teksWatermark = match[1].trim(); // Mengambil nama watermark, misal: "Loker Kendari Official"
        // Opsional: Hapus kalimat instruksi watermark agar tidak ikut tercetak di teks utama
        teksBersih = kontenMentah.replace(/buat dengan menyertakan|dengan menyertakan|watermark.*/gi, '').trim();
    }

    // 2. Buat elemen HTML sementara di memori untuk dirender jadi PDF
    const elemenPDF = document.createElement('div');
    elemenPDF.style.position = 'relative';
    elemenPDF.style.padding = '40px';
    elemenPDF.style.width = '595px'; // Ukuran standar kertas A4 (proporsional)
    elemenPDF.style.minHeight = '842px';
    elemenPDF.style.backgroundColor = '#ffffff';

    // Masukkan Judul dan Teks Bersih
    elemenPDF.innerHTML = `
        <h1 style="font-size: 24px; margin-bottom: 20px;">${judul}</h1>
        <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${teksBersih}</p>
    `;

    // 3. Jika watermark ditemukan, injeksi elemen watermark transparan di latar belakang
    if (teksWatermark) {
        const bgWatermark = document.createElement('div');
        bgWatermark.innerText = teksWatermark;
        bgWatermark.style.position = 'absolute';
        bgWatermark.style.top = '50%';
        bgWatermark.style.left = '50%';
        bgWatermark.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
        bgWatermark.style.fontSize = '40px';
        bgWatermark.style.fontWeight = 'bold';
        bgWatermark.style.color = 'rgba(200, 200, 200, 0.25)'; // Sangat transparan
        bgWatermark.style.whiteSpace = 'nowrap';
        bgWatermark.style.pointerEvents = 'none'; // Biar gak ganggu teks
        bgWatermark.style.zIndex = '0';
        
        elemenPDF.appendChild(bgWatermark);
    }

    // 4. Proses cetak menggunakan html2pdf.js
    const opsi = {
        margin:       0,
        filename:     `${judul || 'dokumen'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opsi).from(elemenPDF).save();
});
