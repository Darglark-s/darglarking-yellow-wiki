# The Darglarking Yellow — Meta-Narrative Wiki

Lightweight SCP / fandom-style site: native HTML/CSS, vanilla JS, no frameworks.
Updated **2026-05-27**. **Core frame:** FIELD / VOID / CHAOS / NULL classifies all information;
Four-Tape and PP-INGEST tags are secondary.

## Site map

| Page | Role |
|------|------|
| `index.html` | **Main Page** — featured articles, universal truths, reading guide |
| `doctrine.html` | **Universal Doctrine** — prime directives, storm cycle, canon policy |
| `principles.html` | **Structural Physics** — FIELD · VOID · CHAOS · NULL articles + matrix |
| `frames.html` | **Frame Encyclopedia** — timeline frames, optics profiles, conductor markers |
| `registry.html` | **Object Registry** — anomalies, Godot systems, tapes, PP tags, games |
| `dossier.html` | **Object DGY-███** — SCP-style primary anomaly file |
| `findings.html` | **PP-INGEST** — tiered author truths (authoritative vs personal/biased) |
| `archive.html` | **Corrupted Archive** — 404 / Wayback time-travel mechanic |
| `stego.html` | **Asset Lab** — LSB PNG steganography (DGY1 payloads) |

Shared nav: `js/site-nav-config.js` + `js/site-nav.js` · interactions: `js/main.js` · styles: `css/styles.css`

**Nav rule:** all nine links are required — edit `site-nav-config.js` only (see `.cursor/rules/darglarking-yellow-wiki.mdc`).

## Analytical protocol

1. **Classify** — FIELD (transmission / 90 BPM), VOID (vacuum / karmic debt), CHAOS (entropy), NULL (negation → Null Prevention). See `principles.html` and `darglarking_themes.py` → `ANALYTICAL_PRINCIPLES`
2. **Tier** — authoritative vs personal/biased (PP-INGEST gold vs purple borders)
3. **Implement** — Four-Tape Composer vectors where applicable (`registry.html`)

## Run locally

Open any HTML file in a browser, or:

```bash
npx --yes serve darglarking-yellow
```

Then visit `http://localhost:3000`.

## Hidden mechanics

- **Highlight-to-reveal**: Select text with class `secret-highlight`
- **Invisible collapsible**: Click zero-width trigger (`&#8203;`) after marked paragraphs
- **Broken archive link**: `archive.html` Wayback ghost on 404 thumbnail
- **LSB payloads**: `DGY1://pp/financial-yellow/e8c547` format in Asset Lab

## Related runtime hubs

| Path | Role |
|------|------|
| `godot/Noemaran/` | Godot 4.4 anthology — optics, ClickMatrix, ChitonGrid, Null Prevention |
| `References/` | Godot 3.5.3 legacy trees (feel mirrors) |
| `darglarking_themes.py` | Palette + principles + Four-Tape registry |
