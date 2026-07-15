"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const filmSrc = "/media/dropbox/injectox-skin-loop.mp4";
const posterSrc = "/images/injectox-hero-film-poster.jpg";

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const attemptPlayback = () => {
      if (userPaused.current || document.hidden) return;
      const promise = video.play();
      if (promise) promise.then(handlePlaying).catch(() => setPaused(true));
    };
    const handlePlaying = () => {
      setReady(true);
      setPaused(false);
    };
    const handleVisibility = () => {
      if (!document.hidden) attemptPlayback();
    };

    video.addEventListener("loadeddata", attemptPlayback);
    video.addEventListener("canplay", attemptPlayback);
    video.addEventListener("playing", handlePlaying);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", attemptPlayback);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      userPaused.current = true;
      window.requestAnimationFrame(() => setPaused(true));
    } else if (video.readyState >= 2) {
      attemptPlayback();
    }

    return () => {
      video.removeEventListener("loadeddata", attemptPlayback);
      video.removeEventListener("canplay", attemptPlayback);
      video.removeEventListener("playing", handlePlaying);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", attemptPlayback);
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPaused.current = false;
      video.muted = true;
      const promise = video.play();
      if (promise) promise.catch(() => setPaused(true));
    } else {
      userPaused.current = true;
      video.pause();
      setPaused(true);
    }
  }

  return (
    <div className={`hero-film ${ready ? "is-ready" : ""}`}>
      <Image src={posterSrc} alt="" fill priority sizes="100vw" className="hero-poster" />
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={filmSrc} type="video/mp4; codecs=avc1.4D401F" />
      </video>
      <button className="hero-film-control" type="button" onClick={togglePlayback} aria-label={paused ? "Play background film" : "Pause background film"}>
        {paused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
        <span>{paused ? "Play film" : "Pause film"}</span>
      </button>
    </div>
  );
}
