function generateQR() {
  const text = document.getElementById("text").value;
  const fg = document.getElementById("foreground").value || "#000000";
  const bg = document.getElementById("background").value || "#ffffff";
  const logoInput = document.getElementById("logo");

  if (!text) {
    alert("Please enter text or URL");
    return;
  }

  // Clear old QR
  document.getElementById("qrcode").innerHTML = "";

  // Generate QR
  const qr = new QRCode(document.getElementById("qrcode"), {
    text: text,
    width: 200,
    height: 200,
    colorDark: fg,
    colorLight: bg,
    correctLevel: QRCode.CorrectLevel.H
  });

  // If logo is uploaded, draw it on canvas
  setTimeout(() => {
    const qrCanvas = document.querySelector("#qrcode canvas");
    if (logoInput.files.length > 0 && qrCanvas) {
      const ctx = qrCanvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(logoInput.files[0]);
      img.onload = function () {
        const logoSize = 50;
        ctx.drawImage(img, (qrCanvas.width - logoSize) / 2, (qrCanvas.height - logoSize) / 2, logoSize, logoSize);
      };
    }
  }, 300);
}

function downloadQR(type) {
  const canvas = document.querySelector("#qrcode canvas");
  if (!canvas) {
    alert("Please generate a QR code first!");
    return;
  }
  const link = document.createElement("a");
  link.download = `qrcode.${type}`;
  link.href = canvas.toDataURL(`image/${type}`);
  link.click();
}