import { useState, useRef, useEffect } from "react";
import "./App.css";
import songs from "./songs";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [search, setSearch] = useState("");
  const audioRef = useRef(null);

  const currentSong = currentIndex !== null ? songs[currentIndex] : null;

  const playSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  // Load new src when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    audio.src = currentSong.src;
    audio.load();
    if (isPlaying) audio.play().catch(() => {});
  }, [currentIndex]);

  // Handle play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentIndex === null) playSong(0);
    else setIsPlaying((p) => !p);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleEnded = () => {
    if (currentIndex < songs.length - 1) playSong(currentIndex + 1);
    else setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <span className="logo">Sputipay</span>
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Song Grid */}
      <main className="main">
        <div className="section-title">Recent</div>
        <div className="album-grid">
          {filtered.map((song) => {
            const isActive = currentIndex === songs.indexOf(song);
            return (
              <div
                key={song.id}
                className={`album-card ${isActive ? "active" : ""}`}
                onClick={() => playSong(songs.indexOf(song))}
              >
                <div className="album-art">
                  <img src={song.cover} alt={song.title} />
                  {isActive && isPlaying && (
                    <div className="playing-bars">
                      <span /><span /><span />
                    </div>
                  )}
                  {isActive && (
                    <div className="active-overlay">
                      {isPlaying ? "▐▐" : "▶"}
                    </div>
                  )}
                </div>
                <div className="album-name">{song.title}</div>
                <div className="album-artist">{song.artist}</div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Player */}
      <footer className="player">
        <div className="player-info">
          <div className="player-thumb">
            {currentSong && <img src={currentSong.cover} alt={currentSong.title} />}
          </div>
          <div className="player-text">
            <div className="player-title">{currentSong?.title || "Title of song"}</div>
            <div className="player-artist">{currentSong?.artist || "Artist name"}</div>
          </div>
        </div>

        <div className="player-controls">
          {/* Prev */}
          <button
            className="skip-btn"
            onClick={() => currentIndex > 0 && playSong(currentIndex - 1)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <polygon points="19,5 9,12 19,19" />
              <rect x="5" y="5" width="3" height="14" rx="1" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            className="skip-btn"
            onClick={() => currentIndex !== null && currentIndex < songs.length - 1 && playSong(currentIndex + 1)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <polygon points="5,5 15,12 5,19" />
              <rect x="16" y="5" width="3" height="14" rx="1" />
            </svg>
          </button>

          {/* Progress */}
          <div className="progress-bar" onClick={handleSeek}>
            <div
              className="progress-fill"
              style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
            />
          </div>

          <span className="time">{fmt(progress)} / {fmt(duration)}</span>
        </div>
      </footer>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
}
