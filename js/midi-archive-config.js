/**
 * Canonical generated MIDI catalog — sync with assets/midi/ and generator scripts.
 * Source of truth: generate_forgiveness_variable.py, generate_transition.py,
 * generate_volatility_paradox.py, darglarking_themes.py
 */
(function (global) {
  "use strict";

  global.DGY_MIDI_CATALOG = [
    {
      id: "forgiveness-variable",
      filename: "darglarking_yellow.mid",
      title: "Forgiveness Variable",
      subtitle: "Pi / E motif · sea of stars calm",
      classification: "EUCLID · FIELD · CHITON CALM",
      principle: "field",
      optics: "chiton",
      bpm: "90",
      bars: "48",
      tracks: "Meta · Pi motif · E counterline",
      generator: "generate_forgiveness_variable.py",
      marker: "CHITON - sea of stars (Forgiveness variable)",
      themeColor: "#a8c4cf",
      ppSource: "IMG_1311 cosmic calm; pdf1 p12 purple resilience letter",
      explanation:
        "Forgiveness is modeled as debt paid at breach tempo—not erasure. Pi digits drive an A minor / A dorian modal walk; E digits anchor the bass counterline. Microtonal pitch bends on 8/9 events echo the purple-letter resilience frame. This is the longest calm anchor in the archive: storms pass, the lighthouse persists.",
      downloadPath: "assets/midi/darglarking_yellow.mid",
    },
    {
      id: "transition-bridge",
      filename: "transition_bridge_output.mid",
      title: "Transition Bridge",
      subtitle: "90 → 130 BPM storm ramp",
      classification: "EUCLID · TRANSITIONAL · BREACH HANDOFF",
      principle: "void",
      optics: "transitional",
      bpm: "90→130",
      bars: "4",
      tracks: "Tempo map · Polyvagal pulse",
      generator: "generate_transition.py",
      marker: "Darglarking Yellow - storm ramp (90->130 BPM)",
      themeColor: "#e8c547",
      ppSource: "IMG_1311 Eiffel gold; IMG_1312 storm; pdf1 p1 anger cycle ramp",
      explanation:
        "Mandatory handoff between Track 3 calm and Track 2 Volatility Paradox playback. Four bars of accelerating tempo—polyvagal pulse percussion encodes the anger-cycle ramp from Stay calm (Chiton) toward Dragonfly escalation. Prime directive: calm before breach; this file is the sanctioned crossing point.",
      downloadPath: "assets/midi/transition_bridge_output.mid",
    },
    {
      id: "volatility-paradox",
      filename: "volatility_paradox_output.mid",
      title: "Volatility Paradox",
      subtitle: "Track 2 breach core · 32-bar Lyren compiler output",
      classification: "INTERCEPTED · MULTI-PRINCIPLE · NARRATIVE HAZARD",
      principle: "chaos",
      optics: "dragonfly",
      bpm: "90 calm → 130 breach",
      bars: "32",
      tracks: "Calm prelude · Ka · Karma · Luck · Conductor markers",
      generator: "generate_volatility_paradox.py",
      marker: "STORM CAME - Volatility breach (130 BPM)",
      themeColor: "#a07a7a",
      ppSource: "IMG_1312 — The Storm Came / The storm went; Volatility Paradox structure",
      explanation:
        "Full structural physics engine in MIDI form. Bars 1–4: Track 3 calm @ 90 BPM (Chiton grid). Bars 1–16: FIELD grounded arrays. Bars 17–24: VOID gated silence / karmic ghost lane. Bars 25–32: CHAOS luck fragmentation with cumulative silence debt. Conductor markers at bars 0, 4, 16, 24, 28 map forgiveness variable, breach, lighthouse kick, carapace fracture, and primary collapse.",
      downloadPath: "assets/midi/volatility_paradox_output.mid",
      previewAudio: "assets/audio/chiton-calm-90bpm.wav",
      previewLabel: "Calm prelude excerpt (WAV)",
    },
  ];
})(typeof window !== "undefined" ? window : globalThis);
