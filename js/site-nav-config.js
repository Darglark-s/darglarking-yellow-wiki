/**
 * Canonical Darglarking Yellow wiki navigation — DO NOT remove or reorder
 * required links without updating .cursor/rules/darglarking-yellow-wiki.mdc
 *
 * Single source of truth for js/site-nav.js on every page.
 */
(function (global) {
  "use strict";

  var REQUIRED_NAV_LINKS = [
    { href: "index.html", label: "Main Page", required: true },
    { href: "doctrine.html", label: "Doctrine", required: true },
    { href: "principles.html", label: "Principles", required: true },
    { href: "frames.html", label: "Frames", required: true },
    { href: "registry.html", label: "Registry", required: true },
    { href: "con-779.html", label: "CON-779", required: true },
    { href: "dossier.html", label: "Dossier", required: true },
    { href: "findings.html", label: "PP-INGEST", required: true },
    { href: "archive.html", label: "Archive", required: true },
    { href: "stego.html", label: "Asset Lab", required: true },
  ];

  global.DGY_NAV_LINKS = REQUIRED_NAV_LINKS;
  global.DGY_REQUIRED_NAV_HREFS = REQUIRED_NAV_LINKS.filter(function (l) {
    return l.required;
  }).map(function (l) {
    return l.href;
  });
})(typeof window !== "undefined" ? window : globalThis);
