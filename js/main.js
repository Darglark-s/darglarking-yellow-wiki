/**
 * The Darglarking Yellow — shared interaction layer
 */

(function () {
  "use strict";

  var CLEARANCE_KEY = "dgy-clearance-level";
  var CLEARANCE_CYCLE = ["restricted", "confidential", "unredacted"];
  var CLEARANCE_LABELS = {
    restricted: "RESTRICTED",
    confidential: "CONFIDENTIAL",
    unredacted: "UNREDACTED",
  };

  var BOOT_LINES = [
    { text: "> DGY-NET :: handshake OK", cls: "is-ok" },
    { text: "> SESSION :: researcher credential validated", cls: "is-ok" },
    { text: "> MIRROR :: github-pages containment shard online", cls: "is-ok" },
    { text: "> PP-INGEST :: tier classifier armed (FIELD/VOID/CHAOS/NULL)", cls: "is-warn" },
    { text: "> ACCESS GRANTED — read clearance before opening addenda", cls: "is-warn" },
  ];

  /** Invisible collapsible: whitespace-pixel trigger toggles sibling secret block */
  function initInvisibleCollapsibles() {
    document.querySelectorAll("[data-invisible-collapse]").forEach(function (root) {
      var trigger = root.querySelector(".invisible-trigger");
      var secret = root.querySelector(".collapsible-secret");
      if (!trigger || !secret) return;

      function toggle() {
        var open = secret.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
        secret.setAttribute("aria-hidden", open ? "false" : "true");
      }

      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /** Optional: log highlight-reveal discovery (no spoilers in console) */
  function initHighlightReveal() {
    document.querySelectorAll(".secret-highlight").forEach(function (el) {
      el.addEventListener("mouseup", function () {
        var sel = window.getSelection();
        if (!sel || sel.isCollapsed) return;
        if (sel.toString().trim().length > 0 && el.contains(sel.anchorNode)) {
          el.dataset.discovered = "true";
        }
      });
    });
  }

  /** Store masked text for designation tokens and redacted spans */
  function initRedactTokens() {
    document.querySelectorAll(".redact-token[data-unredact]").forEach(function (el) {
      if (!el.dataset.masked) {
        el.dataset.masked = el.textContent.trim();
      }
    });

    document.querySelectorAll(".redacted[data-unredact]").forEach(function (el) {
      if (!el.dataset.masked) {
        el.dataset.masked = el.textContent.trim();
      }
    });
  }

  function applyRedactionLevel(level) {
    document.querySelectorAll(".redact-token[data-unredact]").forEach(function (el) {
      if (level === "unredacted") {
        var prefix = el.dataset.prefix || "";
        el.textContent = prefix + el.dataset.unredact;
      } else {
        el.textContent = el.dataset.masked || el.textContent;
      }
    });

    document.querySelectorAll(".redacted[data-unredact]").forEach(function (el) {
      if (level === "unredacted") {
        el.textContent = el.dataset.unredact;
      } else {
        el.textContent = el.dataset.masked || "████████";
      }
    });

    document.querySelectorAll(".redacted-lore[data-reveal]").forEach(function (el) {
      if (level === "unredacted") {
        if (!el.classList.contains("is-revealed")) {
          el.textContent = el.dataset.reveal;
          el.classList.add("is-revealed");
        }
      } else {
        var mask = el.dataset.mask || "[REDACTED LORE BLOCK]";
        el.textContent = mask;
        el.classList.remove("is-revealed");
      }
    });

    document.querySelectorAll(".collapsible-secret").forEach(function (secret) {
      if (level === "unredacted") {
        secret.classList.add("is-open");
        secret.setAttribute("aria-hidden", "false");
      } else {
        secret.classList.remove("is-open");
        secret.setAttribute("aria-hidden", "true");
        var root = secret.closest("[data-invisible-collapse]");
        if (root) {
          var trigger = root.querySelector(".invisible-trigger");
          if (trigger) {
            trigger.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  }

  function setClearanceLevel(level) {
    if (CLEARANCE_CYCLE.indexOf(level) === -1) {
      level = "restricted";
    }

    document.body.classList.remove(
      "clearance-restricted",
      "clearance-confidential",
      "clearance-unredacted"
    );
    document.body.classList.add("clearance-" + level);

    var toggle = document.querySelector(".clearance-toggle");
    if (toggle) {
      toggle.textContent = CLEARANCE_LABELS[level];
      toggle.setAttribute("aria-pressed", level !== "restricted" ? "true" : "false");
    }

    var hint = document.querySelector(".clearance-hint");
    if (hint) {
      if (level === "restricted") {
        hint.textContent = "Highlight-to-reveal and addenda remain sealed.";
      } else if (level === "confidential") {
        hint.textContent = "Classified highlights visible. Redactions remain masked.";
      } else {
        hint.textContent = "Full disclosure — designations and addenda unlocked.";
      }
    }

    applyRedactionLevel(level);

    try {
      localStorage.setItem(CLEARANCE_KEY, level);
    } catch (err) {
      /* ignore private mode */
    }
  }

  function cycleClearance() {
    var current = "restricted";
    CLEARANCE_CYCLE.forEach(function (level) {
      if (document.body.classList.contains("clearance-" + level)) {
        current = level;
      }
    });
    var idx = CLEARANCE_CYCLE.indexOf(current);
    var next = CLEARANCE_CYCLE[(idx + 1) % CLEARANCE_CYCLE.length];
    setClearanceLevel(next);
  }

  function initClearanceToggle() {
    var classification = document.querySelector(".classification");
    if (!classification) return;

    var bar = document.createElement("div");
    bar.className = "clearance-bar";
    bar.innerHTML =
      '<span class="clearance-label">Disclosure level</span>' +
      '<button type="button" class="clearance-toggle" aria-pressed="false">RESTRICTED</button>' +
      '<span class="clearance-hint">Highlight-to-reveal and addenda remain sealed.</span>';

    classification.insertAdjacentElement("afterend", bar);

    bar.querySelector(".clearance-toggle").addEventListener("click", cycleClearance);

    var stored = "restricted";
    try {
      stored = localStorage.getItem(CLEARANCE_KEY) || "restricted";
    } catch (err) {
      stored = "restricted";
    }
    setClearanceLevel(stored);
  }

  function initTerminalBoot() {
    var nav = document.querySelector("nav.primary-nav");
    if (!nav) return;

    var boot = document.createElement("div");
    boot.className = "terminal-boot";
    boot.setAttribute("aria-live", "polite");
    boot.setAttribute("aria-label", "Session access log");

    var inner = document.createElement("div");
    inner.className = "terminal-boot-inner";
    boot.appendChild(inner);

    nav.insertAdjacentElement("afterend", boot);

    BOOT_LINES.forEach(function (line, i) {
      window.setTimeout(function () {
        var p = document.createElement("p");
        p.className = "terminal-boot-line " + (line.cls || "");
        p.textContent = line.text;
        inner.appendChild(p);

        if (i === BOOT_LINES.length - 1) {
          window.setTimeout(function () {
            boot.classList.add("is-collapsed");
          }, 2800);
        }
      }, 180 + i * 220);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initRedactTokens();
    initInvisibleCollapsibles();
    initHighlightReveal();
    initTerminalBoot();
    initClearanceToggle();
  });
})();
