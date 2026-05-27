/**
 * LSB (Least Significant Bit) steganography for PNG assets.
 * Embeds a UTF-8 message into the R channel LSBs of consecutive pixels.
 */

(function (global) {
  "use strict";

  var MAGIC = "DGY1";

  function stringToBits(str) {
    var encoder = new TextEncoder();
    var bytes = encoder.encode(str);
    var bits = [];
    var i;
    var b;
    var bit;
    for (i = 0; i < bytes.length; i++) {
      b = bytes[i];
      for (bit = 7; bit >= 0; bit--) {
        bits.push((b >> bit) & 1);
      }
    }
    return bits;
  }

  function bitsToString(bits) {
    var bytes = [];
    var i;
    var b;
    var bit;
    for (i = 0; i + 8 <= bits.length; i += 8) {
      b = 0;
      for (bit = 0; bit < 8; bit++) {
        b = (b << 1) | bits[i + bit];
      }
      bytes.push(b);
    }
    try {
      return new TextDecoder().decode(new Uint8Array(bytes));
    } catch (e) {
      return "";
    }
  }

  function bitsToLengthHeader(len) {
    var bits = [];
    var i;
    for (i = 31; i >= 0; i--) {
      bits.push((len >> i) & 1);
    }
    return bits;
  }

  function lengthHeaderToBits(bits) {
    var len = 0;
    var i;
    for (i = 0; i < 32; i++) {
      len = (len << 1) | (bits[i] || 0);
    }
    return len;
  }

  /**
   * @param {ImageData} imageData
   * @param {string} message
   * @returns {ImageData}
   */
  function embedMessage(imageData, message) {
    var data = imageData.data;
    var payload = stringToBits(message);
    var header = bitsToLengthHeader(payload.length);
    var magicBits = stringToBits(MAGIC);
    var allBits = magicBits.concat(header).concat(payload);
    var maxBits = Math.floor(data.length / 4) * 3;
    if (allBits.length > maxBits) {
      throw new Error(
        "Message too long for image. Max ~" +
          Math.floor((maxBits - magicBits.length - 32) / 8) +
          " UTF-8 bytes."
      );
    }

    var bitIndex = 0;
    var i;
    var channel;
    for (i = 0; i < data.length && bitIndex < allBits.length; i += 4) {
      for (channel = 0; channel < 3 && bitIndex < allBits.length; channel++) {
        data[i + channel] = (data[i + channel] & 0xfe) | allBits[bitIndex];
        bitIndex++;
      }
    }

    return imageData;
  }

  /**
   * @param {ImageData} imageData
   * @returns {string|null}
   */
  function extractMessage(imageData) {
    var data = imageData.data;
    var bits = [];
    var i;
    var channel;
    var maxRead = data.length;

    for (i = 0; i < data.length && bits.length < maxRead; i += 4) {
      for (channel = 0; channel < 3; channel++) {
        bits.push(data[i + channel] & 1);
      }
    }

    var magicBits = stringToBits(MAGIC);
    var j;
    for (j = 0; j < magicBits.length; j++) {
      if (bits[j] !== magicBits[j]) {
        return null;
      }
    }

    var offset = magicBits.length;
    var lenBits = bits.slice(offset, offset + 32);
    var payloadLen = lengthHeaderToBits(lenBits);
    if (payloadLen <= 0 || payloadLen > bits.length) {
      return null;
    }

    var payloadBits = bits.slice(offset + 32, offset + 32 + payloadLen);
    return bitsToString(payloadBits);
  }

  function loadImageFromFile(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("Could not load image."));
      };
      img.src = url;
    });
  }

  function imageToImageData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    return {
      imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
      canvas: canvas,
      ctx: ctx,
    };
  }

  function imageDataToBlob(imageData, canvas, ctx) {
    ctx.putImageData(imageData, 0, 0);
    return new Promise(function (resolve) {
      canvas.toBlob(function (blob) {
        resolve(blob);
      }, "image/png");
    });
  }

  global.DarglarkingLSB = {
    embedMessage: embedMessage,
    extractMessage: extractMessage,
    loadImageFromFile: loadImageFromFile,
    imageToImageData: imageToImageData,
    imageDataToBlob: imageDataToBlob,
  };
})(typeof window !== "undefined" ? window : globalThis);
