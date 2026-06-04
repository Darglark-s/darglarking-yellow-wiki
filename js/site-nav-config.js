/**
 * Canonical Darglarking Yellow wiki navigation — DO NOT remove or reorder
 * required links without updating .cursor/rules/darglarking-yellow-wiki.mdc
 *
 * Single source of truth for js/site-nav.js on every page.
 * NAV_CONFIG_VERSION=14 — bump HTML ?v= when this list changes.
 */
(function (global) {
  "use strict";

  var REQUIRED_NAV_LINKS = [
    { href: "index.html", label: "Main Page", required: true },
    { href: "doctrine.html", label: "Doctrine", required: true },
    { href: "principles.html", label: "Principles", required: true },
    { href: "origin-matrix.html", label: "Origin", required: true },
    { href: "architecture.html", label: "Architecture", required: true },
    { href: "camera.html", label: "Camera", required: true },
    { href: "simulation-theory.html", label: "Simulation", required: true },
    { href: "frames.html", label: "Frames", required: true },
    { href: "registry.html", label: "Registry", required: true },
    { href: "classified.html", label: "Classified", required: true },
    { href: "world-domination.html", label: "World Dom", required: true },
    { href: "dossier.html", label: "Dossier", required: true },
    { href: "cipher.html", label: "Cipher", required: true },
    { href: "magic.html", label: "Magic", required: true },
    { href: "field-guide.html", label: "Field Guide", required: true },
    { href: "deshret-protocol.html", label: "Deshret", required: true },
    { href: "eight-system.html", label: "8 System", required: true },
    { href: "delusion-assessment.html", label: "Assessment", required: true },
    { href: "case-studies.html", label: "Case Studies", required: true },
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
