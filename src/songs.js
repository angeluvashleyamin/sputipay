// ─────────────────────────────────────────────
//  HOW TO USE
//  1. Put your audio files in:  src/assets/audio/
//  2. Put your cover images in: src/assets/images/
//  3. Update the filenames below to match yours
// ─────────────────────────────────────────────

import cover1 from "./assets/images/cover1.jpg";
import cover2 from "./assets/images/cover2.jpg";
import cover3 from "./assets/images/cover3.jpg";
import cover4 from "./assets/images/cover4.jpg";
import cover5 from "./assets/images/cover5.png";

import audio1 from "./assets/audio/aboutyou.mp3";
import audio2 from "./assets/audio/kanibalismo.mp3";
import audio3 from "./assets/audio/birdsofthefeather.mp3";
import audio4 from "./assets/audio/loveme.mp3";
import audio5 from "./assets/audio/dieonthishill.mp3";

const songs = [
  {
    id: 1,
    title: "aboutyou",
    artist: "The 1975",
    cover: cover1,
    src: audio1,
  },
  {
    id: 2,
    title: "kanibalismo",
    artist: "Artist Two",
    cover: cover2,
    src: audio2,
  },
  {
    id: 3,
    title: "birdsofthefeather",
    artist: "Billie Eilish",
    cover: cover3,
    src: audio3,
  },
  {
    id: 4,
    title: "Love me",
    artist: "JMSN",
    cover: cover4,
    src: audio4,
  },
  {
    id: 5,
    title: "Die On This Hill",
    artist: "Sienna Spiro",
    cover: cover5,
    src: audio5,
  },
];

export default songs;
