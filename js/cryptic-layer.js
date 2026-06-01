/**
 * Cryptic layer — subtle non-disruptive refract + drift mechanics.
 * Magnum Opus filter: decode, do not lecture.
 */
(function () {
  "use strict";

  var SHIFT_CHARS = "█▓▒░·∴◆";

  function initCrypticShift() {
    document.querySelectorAll("[data-cryptic-shift]").forEach(function (el) {
      var original = el.textContent;
      var timer = null;
      var ticks = 0;

      function reset() {
        if (timer) {
          window.clearInterval(timer);
          timer = null;
        }
        ticks = 0;
        el.textContent = original;
        el.classList.remove("is-shifting");
      }

      el.addEventListener("mouseenter", function () {
        if (timer) return;
        el.classList.add("is-shifting");
        timer = window.setInterval(function () {
          ticks += 1;
          if (ticks > 24) {
            reset();
            return;
          }
          var chars = original.split("");
          el.textContent = chars
            .map(function (ch, i) {
              if (ch === " " || ch === "·" || ch === "—") return ch;
              if (Math.random() > 0.35) return ch;
              return SHIFT_CHARS.charAt(Math.floor(Math.random() * SHIFT_CHARS.length));
            })
            .join("");
        }, 90);
      });

      el.addEventListener("mouseleave", reset);
      el.addEventListener("blur", reset);
    });
  }

  function initCrypticNotes() {
    document.querySelectorAll("[data-cryptic-note]").forEach(function (el) {
      var note = el.getAttribute("data-cryptic-note");
      if (!note) return;
      el.setAttribute("title", "");
      el.addEventListener("click", function () {
        el.dataset.noteAck = "true";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCrypticShift();
    initCrypticNotes();
  });
})();
