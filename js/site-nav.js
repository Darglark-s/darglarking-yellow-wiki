/**
 * Shared site navigation — inject consistent wiki nav on all pages.
 */
(function () {
  "use strict";

  var LINKS = [
    { href: "index.html", label: "Main Page" },
    { href: "doctrine.html", label: "Doctrine" },
    { href: "principles.html", label: "Principles" },
    { href: "frames.html", label: "Frames" },
    { href: "registry.html", label: "Registry" },
    { href: "dossier.html", label: "Dossier" },
    { href: "findings.html", label: "PP-INGEST" },
    { href: "archive.html", label: "Archive" },
    { href: "stego.html", label: "Asset Lab" },
  ];

  function injectNav() {
    var nav = document.querySelector("nav.primary-nav[data-auto-nav]");
    if (!nav) return;

    var path = window.location.pathname.split("/").pop() || "index.html";
    nav.innerHTML = "";

    LINKS.forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      if (link.href === path) {
        a.setAttribute("aria-current", "page");
        a.style.color = "var(--text-gold)";
        a.style.fontWeight = "bold";
      }
      nav.appendChild(a);
    });
  }

  document.addEventListener("DOMContentLoaded", injectNav);
})();
