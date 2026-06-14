function generateWatermarkLines(text) {
    const baseText = `${text} &nbsp;&nbsp;&nbsp;&nbsp; ${text}`;
    let lines = '';
    for (let i = 0; i < 15; i++) {
        const shiftClass = (i % 2 === 1) ? 'shift' : '';
        lines += `<div class="watermark-line ${shiftClass}">${baseText}</div>`;
    }
    return lines;
}
function updateWatermark() {
    const text = document.getElementById('watermarkText').value;
    const opacity = parseFloat(document.getElementById('opacity').value);
    const rotation = parseInt(document.getElementById('rotation').value);
    const fontSize = parseInt(document.getElementById('fontSize').value);
    document.getElementById('opacityValue').innerText = opacity;
    document.getElementById('rotationValue').innerText = rotation + '°';
    document.getElementById('fontSizeValue').innerText = fontSize + 'pt';
    const layer = document.getElementById('watermarkLayer');
    layer.innerHTML = generateWatermarkLines(text);
    const lines = document.querySelectorAll('.watermark-line');
    lines.forEach(line => {
        line.style.opacity = opacity;
        line.style.transform = `rotate(${rotation}deg)`;
        line.style.fontSize = fontSize + 'pt';
        line.style.color = '#b0b0b0';
    });
}
function downloadPDF() {
    alert("Jalankan `python generate_pdf.py` di folder file/");
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('watermarkText').addEventListener('input', updateWatermark);
    document.getElementById('opacity').addEventListener('input', updateWatermark);
    document.getElementById('rotation').addEventListener('input', updateWatermark);
    document.getElementById('fontSize').addEventListener('input', updateWatermark);
    document.getElementById('downloadPdfBtn').addEventListener('click', downloadPDF);
    updateWatermark();
});