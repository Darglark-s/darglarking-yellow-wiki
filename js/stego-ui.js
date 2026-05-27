/**
 * Steganography tool UI wiring
 */

(function () {
  "use strict";

  var LSB = window.DarglarkingLSB;
  if (!LSB) return;

  var fileInput = document.getElementById("stego-file");
  var messageInput = document.getElementById("stego-message");
  var extractOutput = document.getElementById("stego-extract-out");
  var statusEl = document.getElementById("stego-status");
  var previewCanvas = document.getElementById("stego-preview");
  var embedBtn = document.getElementById("stego-embed");
  var extractBtn = document.getElementById("stego-extract");
  var downloadLink = document.getElementById("stego-download");

  var currentImg = null;
  var lastBlobUrl = null;

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function revokeLastBlob() {
    if (lastBlobUrl) {
      URL.revokeObjectURL(lastBlobUrl);
      lastBlobUrl = null;
    }
  }

  function drawPreview(img) {
    if (!previewCanvas) return;
    previewCanvas.width = Math.min(img.naturalWidth, 480);
    previewCanvas.height = Math.min(
      img.naturalHeight,
      Math.floor((previewCanvas.width / img.naturalWidth) * img.naturalHeight)
    );
    var ctx = previewCanvas.getContext("2d");
    ctx.drawImage(img, 0, 0, previewCanvas.width, previewCanvas.height);
  }

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      if (file.type !== "image/png") {
        setStatus("Use PNG only — lossless pixels required for LSB.");
        return;
      }
      LSB.loadImageFromFile(file)
        .then(function (img) {
          currentImg = img;
          drawPreview(img);
          setStatus("Asset loaded: " + img.naturalWidth + "×" + img.naturalHeight);
        })
        .catch(function (err) {
          setStatus(err.message || "Load failed.");
        });
    });
  }

  if (embedBtn) {
    embedBtn.addEventListener("click", function () {
      if (!currentImg) {
        setStatus("Upload a PNG first.");
        return;
      }
      var msg = (messageInput && messageInput.value) || "";
      if (!msg.trim()) {
        setStatus("Enter a secret string to embed.");
        return;
      }
      try {
        var pack = LSB.imageToImageData(currentImg);
        var embedded = LSB.embedMessage(pack.imageData, msg);
        LSB.imageDataToBlob(embedded, pack.canvas, pack.ctx).then(function (blob) {
          revokeLastBlob();
          lastBlobUrl = URL.createObjectURL(blob);
          if (downloadLink) {
            downloadLink.href = lastBlobUrl;
            downloadLink.download = "darglarking-asset-stego.png";
            downloadLink.hidden = false;
          }
          var outImg = new Image();
          outImg.onload = function () {
            currentImg = outImg;
            drawPreview(outImg);
          };
          outImg.src = lastBlobUrl;
          setStatus("Embedded. Download the PNG and distribute in-game.");
        });
      } catch (e) {
        setStatus(e.message || "Embed failed.");
      }
    });
  }

  if (extractBtn) {
    extractBtn.addEventListener("click", function () {
      if (!currentImg) {
        setStatus("Upload a PNG first.");
        return;
      }
      var pack = LSB.imageToImageData(currentImg);
      var text = LSB.extractMessage(pack.imageData);
      if (extractOutput) {
        extractOutput.value = text === null ? "(no DGY1 payload detected)" : text;
      }
      setStatus(text === null ? "No valid payload." : "Payload extracted.");
    });
  }
})();
