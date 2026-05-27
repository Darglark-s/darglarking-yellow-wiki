/**
 * Renders classified MIDI archive cards from midi-archive-config.js
 */
(function () {
  "use strict";

  function principleBadgeClass(principle) {
    if (principle === "field") return "badge-field";
    if (principle === "void") return "badge-void";
    if (principle === "chaos") return "badge-chaos";
    if (principle === "null") return "badge-null";
    return "";
  }

  function renderCard(entry) {
    var card = document.createElement("article");
    card.className = "midi-archive-card";
    card.id = "midi-" + entry.id;
    card.style.setProperty("--midi-accent", entry.themeColor || "#e8c547");

    var previewHtml = "";
    if (entry.previewAudio) {
      previewHtml =
        '<div class="midi-preview">' +
        '<span class="midi-preview-label">' +
        (entry.previewLabel || "Preview") +
        "</span>" +
        '<audio controls preload="none" src="' +
        entry.previewAudio +
        '"></audio>' +
        "</div>";
    }

    card.innerHTML =
      '<header class="midi-card-header">' +
      '<span class="midi-classification">' +
      entry.classification +
      "</span>" +
      '<h3 class="midi-title">' +
      entry.title +
      "</h3>" +
      '<p class="midi-subtitle">' +
      entry.subtitle +
      "</p>" +
      "</header>" +
      '<div class="midi-meta">' +
      '<span class="badge ' +
      principleBadgeClass(entry.principle) +
      '">' +
      entry.principle.toUpperCase() +
      "</span>" +
      '<span class="badge badge-euclid">' +
      entry.optics +
      "</span>" +
      '<span class="mono midi-stat">' +
      entry.bpm +
      " BPM</span>" +
      '<span class="mono midi-stat">' +
      entry.bars +
      " bars</span>" +
      "</div>" +
      '<p class="midi-explanation">' +
      entry.explanation +
      "</p>" +
      '<dl class="midi-spec">' +
      "<dt>Conductor marker</dt><dd class=\"mono\">" +
      entry.marker +
      "</dd>" +
      "<dt>Generator</dt><dd class=\"mono\">" +
      entry.generator +
      "</dd>" +
      "<dt>Tracks</dt><dd>" +
      entry.tracks +
      "</dd>" +
      "<dt>PP-INGEST</dt><dd class=\"source-tag\">" +
      entry.ppSource +
      "</dd>" +
      "</dl>" +
      previewHtml +
      '<p class="midi-download">' +
      '<a class="midi-dl-btn" href="' +
      entry.downloadPath +
      '" download="' +
      entry.filename +
      '">Download ' +
      entry.filename +
      "</a>" +
      "</p>";

    return card;
  }

  function initMidiArchive() {
    var root = document.querySelector("[data-midi-archive]");
    if (!root || !window.DGY_MIDI_CATALOG) return;

    var grid = document.createElement("div");
    grid.className = "midi-archive-grid";

    window.DGY_MIDI_CATALOG.forEach(function (entry) {
      grid.appendChild(renderCard(entry));
    });

    root.appendChild(grid);
  }

  document.addEventListener("DOMContentLoaded", initMidiArchive);
})();
