/**
 * Object 000 — corrupted slot ambient glitch + transmission reveal (toggle + highlight).
 */
(function () {
  "use strict";

  function initAmbientGlitch(root) {
    var lines = root.querySelectorAll(".object-000-error-line");
    if (!lines.length) return;

    window.setInterval(function () {
      if (Math.random() > 0.35) return;
      lines.forEach(function (line) {
        line.classList.add("is-glitching");
        window.setTimeout(function () {
          line.classList.remove("is-glitching");
        }, 80 + Math.random() * 120);
      });
    }, 2400);
  }

  function typeTransmission(target, fullText, onDone) {
    target.textContent = "";
    target.classList.add("is-typing");
    var i = 0;

    function tick() {
      if (i >= fullText.length) {
        target.classList.remove("is-typing");
        if (onDone) onDone();
        return;
      }
      target.textContent += fullText.charAt(i);
      i += 1;
      window.setTimeout(tick, 12 + Math.random() * 18);
    }

    tick();
  }

  function revealTransmission(zone, body, toggle, fullText) {
    zone.hidden = false;
    zone.classList.add("is-visible");
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "> STREAM RECOVERED :: STABILIZATION LOG";

    body.innerHTML = "";
    var span = document.createElement("span");
    span.className = "object-000-scream is-revealed";
    body.appendChild(span);

    typeTransmission(span, fullText, function () {
      span.classList.add("is-complete");
    });
  }

  function initHighlightVoid(voidPanel) {
    var blocks = voidPanel.querySelectorAll(".object-000-corrupted-block");
    blocks.forEach(function (block) {
      block.addEventListener("mouseup", function () {
        var sel = window.getSelection();
        if (!sel || sel.isCollapsed) return;
        if (sel.toString().trim().length > 0 && block.contains(sel.anchorNode)) {
          voidPanel.classList.add("is-void-discovered");
        }
      });
    });
  }

  function initObject000() {
    var glitchRoot = document.querySelector("[data-object-000-glitch]");
    if (glitchRoot) initAmbientGlitch(glitchRoot);

    var voidPanel = document.querySelector("[data-object-000-void]");
    var toggle = document.querySelector("[data-object-000-toggle]");
    var zone = document.querySelector("[data-object-000-transmission-zone]");
    var body = document.querySelector("[data-object-000-transmission-body]");
    var screamSource = document.querySelector("[data-object-000-source]");

    if (!voidPanel || !toggle || !zone || !body) return;

    var fullText = screamSource ? screamSource.textContent.trim() : "";
    var revealed = false;

    initHighlightVoid(voidPanel);

    toggle.addEventListener("click", function () {
      if (revealed) return;
      revealed = true;
      voidPanel.querySelectorAll(".object-000-corrupted-block").forEach(function (el) {
        el.setAttribute("aria-hidden", "true");
        el.classList.add("is-faded");
      });
      revealTransmission(zone, body, toggle, fullText);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initObject000);
  } else {
    initObject000();
  }
})();
