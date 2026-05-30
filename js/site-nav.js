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
    { href: "classified.html", label: "Classified", required: true },
    { href: "dossier.html", label: "Dossier", required: true },
    { href: "cipher.html", label: "Cipher", required: true },
    { href: "field-guide.html", label: "Field Guide", required: true },
    { href: "delusion-assessment.html", label: "Assessment", required: true },
    { href: "case-studies.html", label: "Case Studies", required: true },
    { href: "findings.html", label: "PP-INGEST", required: true },
    { href: "archive.html", label: "Archive", required: true },
    { href: "stego.html", label: "Asset Lab", required: true },
  ];

  /** Resolved at script parse time — document.currentScript is null after this IIFE returns. */
  var WIKI_ROOT = (function () {
    var script = document.currentScript;
    if (!script || !script.src) {
      return "";
    }
    try {
      var url = new URL(script.src, window.location.href);
      var path = url.pathname.replace(/\\/g, "/");
      var marker = "/js/site-nav.js";
      var idx = path.indexOf(marker);
      if (idx !== -1) {
        return path.slice(0, idx + 1);
      }
    } catch (err) {
      /* fall through */
    }
    return "";
  })();

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

  /** Fallback when currentScript / URL parsing unavailable (legacy relative pages). */
  function getRelativePrefix() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      if (src.indexOf("site-nav.js") !== -1) {
        var up = src.match(/^((?:\.\.\/)+)/);
        return up ? up[1] : "";
      }
    }
    return "";
  }

  function resolveNavHref(linkHref) {
    if (WIKI_ROOT) {
      return WIKI_ROOT + linkHref;
    }
    return getRelativePrefix() + linkHref;
  }

  function getCurrentPageName() {
    var pathname = window.location.pathname.replace(/\\/g, "/");
    var name = pathname.split("/").pop() || "index.html";
    if (!name || name.indexOf(".") === -1) {
      return "index.html";
    }
    return name;
  }

  function injectNav() {
    var nav = document.querySelector("nav.primary-nav[data-auto-nav]");
    if (!nav) {
      console.warn("[DGY-NAV] nav.primary-nav[data-auto-nav] not found");
      return;
    }

    var links = getLinks();
    validateLinks(links);

    var currentPage = getCurrentPageName();
    nav.innerHTML = "";
    nav.setAttribute("role", "navigation");

    links.forEach(function (link) {
      var a = document.createElement("a");
      a.href = resolveNavHref(link.href);
      a.textContent = link.label;
      a.className = "nav-link";
      if (link.required) {
        a.dataset.required = "true";
      }
      if (link.href === currentPage) {
        a.setAttribute("aria-current", "page");
        a.classList.add("is-current");
      }
      nav.appendChild(a);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNav);
  } else {
    injectNav();
  }
})();
