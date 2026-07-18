"use client";

import { useEffect, useRef, useState } from "react";

const filmSrc = "/media/dropbox/injectox-client-hero.mp4";

export function HeroFilm() {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const backdropVideoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mainVideo = mainVideoRef.current;
    const backdropVideo = backdropVideoRef.current;
    if (!mainVideo || !backdropVideo) return;

    const videos = [mainVideo, backdropVideo];

    videos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
    });

    const attemptPlayback = () => {
      if (document.hidden) return;

      // The foreground is the essential film. Let it appear as soon as it is
      // ready, even if the decorative blurred backdrop is still buffering.
      void backdropVideo.play().catch(() => undefined);
      mainVideo.play().then(handlePlaying).catch(() => undefined);
    };
    const handlePlaying = () => {
      setReady(true);
    };
    const handleVisibility = () => {
      if (!document.hidden) attemptPlayback();
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion) {
      mainVideo.addEventListener("loadeddata", attemptPlayback);
      mainVideo.addEventListener("canplay", attemptPlayback);
      mainVideo.addEventListener("playing", handlePlaying);
      document.addEventListener("visibilitychange", handleVisibility);
      window.addEventListener("pageshow", attemptPlayback);

      if (mainVideo.readyState >= 2) {
        attemptPlayback();
      }
    }

    return () => {
      mainVideo.removeEventListener("loadeddata", attemptPlayback);
      mainVideo.removeEventListener("canplay", attemptPlayback);
      mainVideo.removeEventListener("playing", handlePlaying);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", attemptPlayback);
    };
  }, []);

  return (
    <div className={`hero-film ${ready ? "is-ready" : ""}`}>
      <video
        ref={backdropVideoRef}
        className="hero-video hero-video-backdrop"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={filmSrc} type="video/mp4; codecs=avc1.4D401F" />
      </video>
      <video
        ref={mainVideoRef}
        className="hero-video hero-video-main"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={filmSrc} type="video/mp4; codecs=avc1.4D401F" />
      </video>
    </div>
  );
}
