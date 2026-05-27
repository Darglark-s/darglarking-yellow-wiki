/**
 * Browser bundle — keep in sync with audio-timeline.ts and src/hooks/useAudioTimeline.ts
 */

export const DRAGONFLY_SPIN_CADENCE = "miku-miku-oo-ee-oo";

export const TOTAL_BARS = 32;

export const principleSpans = [
  { principle: "field", startBar: 1, endBar: 16, label: "FIELD · grounded grid" },
  { principle: "void", startBar: 17, endBar: 24, label: "VOID · karmic silence" },
  { principle: "chaos", startBar: 25, endBar: 32, label: "CHAOS · luck fragmentation" },
];

export const audioTimelineFrames = [
  {
    id: "track-3-calm-frame",
    label: "Track 3 calm frame",
    track: 3,
    bpm: 90,
    startsAtBar: 1,
    assetPath: "assets/midi/volatility_paradox_output.mid",
    themeId: "track-3-calm-frame",
    themeColor: "#a8c4cf",
    themeSource: "IMG_1312 green sea; Stay calm",
    principle: "field",
  },
  {
    id: "volatility-paradox-playback-frame",
    label: "Volatility Paradox playback",
    track: 2,
    bpm: 130,
    startsAtBar: 5,
    assetPath: "assets/midi/volatility_paradox_output.mid",
    codename: DRAGONFLY_SPIN_CADENCE,
    themeId: "volatility-paradox-playback-frame",
    themeColor: "#a07a7a",
    themeSource: "The Storm Came",
    principle: "chaos",
  },
  {
    id: "volatility-phase-shift",
    label: "Phase shift (lighthouse kick)",
    track: 2,
    bpm: 130,
    startsAtBar: 17,
    assetPath: "assets/midi/volatility_paradox_output.mid",
    themeId: "volatility-phase-shift",
    themeColor: "#e8a65b",
    themeSource: "Lighthouse beacon through rain",
    principle: "void",
  },
  {
    id: "volatility-quantization-failure",
    label: "Carapace grid breach",
    track: 2,
    bpm: 130,
    startsAtBar: 25,
    assetPath: "assets/midi/volatility_paradox_output.mid",
    themeId: "volatility-quantization-failure",
    themeColor: "#3d8b4e",
    themeSource: "Green sea under red rain",
    principle: "chaos",
  },
  {
    id: "volatility-primary-collapse",
    label: "Primary collapse",
    track: 2,
    bpm: 130,
    startsAtBar: 29,
    assetPath: "assets/midi/volatility_paradox_output.mid",
    themeId: "volatility-primary-collapse",
    themeColor: "#38804f",
    themeSource: "The storm went",
    principle: "field",
  },
];

export function getFrameForBar(bar) {
  const active = [...audioTimelineFrames]
    .reverse()
    .find((frame) => bar >= frame.startsAtBar);
  return active ?? audioTimelineFrames[0];
}

export function useAudioTimeline() {
  return {
    frames: audioTimelineFrames,
    principleSpans,
    totalBars: TOTAL_BARS,
    tempoChange: { fromBpm: 90, toBpm: 130, breachStartsAtBar: 5, calmBars: 4 },
    getFrameForBar,
  };
}
