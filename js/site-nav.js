/**
 * Shared site navigation — inject consistent wiki nav on all pages.
 * Config: js/site-nav-config.js (load before this script).
 */
(function () {
  "use strict";

  var FALLBACK_LINKS = [
    { href: "index.html", label: "Main Page", required: true },
    { href: "doctrine.html", label: "Doctrine", required: true },
    { href: "principles.html", label: "Principles", required: true },
    { href: "frames.html", label: "Frames", required: true },
    { href: "registry.html", label: "Registry", required: true },
    { href: "dossier.html", label: "Dossier", required: true },
    { href: "findings.html", label: "PP-INGEST", required: true },
    { href: "archive.html", label: "Archive", required: true },
    { href: "stego.html", label: "Asset Lab", required: true },
  ];

  function getLinks() {
    if (window.DGY_NAV_LINKS && window.DGY_NAV_LINKS.length) {
      return window.DGY_NAV_LINKS;
    }
    return FALLBACK_LINKS;
  }

  function validateLinks(links) {
    var required = window.DGY_REQUIRED_NAV_HREFS || FALLBACK_LINKS.map(function (l) {
      return l.href;
    });
    var present = links.map(function (l) {
      return l.href;
    });
    var missing = required.filter(function (href) {
      return present.indexOf(href) === -1;
    });
    if (missing.length) {
      console.warn("[DGY-NAV] Missing required links:", missing.join(", "));
    }
  }

  function injectNav() {
    var nav = document.querySelector("nav.primary-nav[data-auto-nav]");
    if (!nav) {
      console.warn("[DGY-NAV] nav.primary-nav[data-auto-nav] not found");
      return;
    }

    var links = getLinks();
    validateLinks(links);

    var path = window.location.pathname.split("/").pop() || "index.html";
    nav.innerHTML = "";
    nav.setAttribute("role", "navigation");

    links.forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      a.className = "nav-link";
      if (link.required) {
        a.dataset.required = "true";
      }
      if (link.href === path) {
        a.setAttribute("aria-current", "page");
        a.classList.add("is-current");
      }
      nav.appendChild(a);
    });
  }

  document.addEventListener("DOMContentLoaded", injectNav);
})();
