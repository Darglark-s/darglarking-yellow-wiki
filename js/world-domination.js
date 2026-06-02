/**
 * Project: World Domination — decrypt state machine + glitch transition.
 * Level 1 cover → 1.5s shatter → Level 5 Chaos Insurgency terminal.
 */
(function () {
  "use strict";

  var SCRAMBLE = "█▓▒░0123456789ABCDEF!@#$%&*?";
  var TRANSITION_MS = 1500;

  function scrambleText(el) {
    if (!el || el.dataset.scrambled === "true") return;
    var original = el.textContent;
    el.dataset.originalText = original;
    el.dataset.scrambled = "true";
    var ticks = 0;
    var max = 18;
    var timer = window.setInterval(function () {
      ticks += 1;
      if (ticks >= max) {
        window.clearInterval(timer);
        el.textContent = original
          .split("")
          .map(function () {
            return SCRAMBLE.charAt(Math.floor(Math.random() * SCRAMBLE.length));
          })
          .join("");
        return;
      }
      el.textContent = original
        .split("")
        .map(function (ch) {
          if (ch === " " || ch === "\n") return ch;
          if (Math.random() > 0.45) return ch;
          return SCRAMBLE.charAt(Math.floor(Math.random() * SCRAMBLE.length));
        })
        .join("");
    }, 45);
  }

  function initWorldDomination() {
    var root = document.querySelector(".wd-terminal");
    if (!root) return;

    var cover = document.getElementById("wd-cover");
    var decrypted = document.getElementById("wd-decrypted");
    var overlay = document.getElementById("wd-glitch-overlay");
    var trigger = document.getElementById("wd-override-trigger");
    var recontain = document.getElementById("wd-recontain");
    if (!cover || !decrypted || !overlay || !trigger) return;

    var busy = false;

    function setDecrypted(isDecrypted) {
      document.body.classList.toggle("wd-is-decrypted", isDecrypted);
      document.body.classList.toggle("wd-is-sanitized", !isDecrypted);
      root.classList.toggle("is-decrypted", isDecrypted);
      cover.hidden = isDecrypted;
      decrypted.hidden = !isDecrypted;
      trigger.setAttribute("aria-expanded", isDecrypted ? "true" : "false");
      try {
        if (isDecrypted) {
          sessionStorage.setItem("dgy-wd-decrypted", "1");
        } else {
          sessionStorage.removeItem("dgy-wd-decrypted");
        }
      } catch (err) {
        /* ignore */
      }
    }

    function runDecrypt() {
      if (busy || root.classList.contains("is-decrypted")) return;
      busy = true;
      overlay.hidden = false;
      overlay.classList.add("is-active");
      root.classList.add("is-glitching");
      document.body.classList.add("wd-glitching");

      cover.querySelectorAll("[data-wd-scramble]").forEach(scrambleText);

      window.setTimeout(function () {
        overlay.classList.remove("is-active");
        overlay.hidden = true;
        root.classList.remove("is-glitching");
        document.body.classList.remove("wd-glitching");
        setDecrypted(true);
        busy = false;
      }, TRANSITION_MS);
    }

    trigger.addEventListener("click", function () {
      runDecrypt();
    });

    if (recontain) {
      recontain.addEventListener("click", function () {
        cover.querySelectorAll("[data-wd-scramble]").forEach(function (el) {
          if (el.dataset.originalText) {
            el.textContent = el.dataset.originalText;
            el.dataset.scrambled = "false";
          }
        });
        setDecrypted(false);
      });
    }

    try {
      if (sessionStorage.getItem("dgy-wd-decrypted") === "1") {
        setDecrypted(true);
      }
    } catch (err) {
      /* ignore */
    }
  }

  document.addEventListener("DOMContentLoaded", initWorldDomination);
})();
