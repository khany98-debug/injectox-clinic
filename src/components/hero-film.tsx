"use client";

import { useEffect, useRef, useState } from "react";

const filmSrc = "/media/dropbox/injectox-client-hero.mp4";
const posterSrc = "/images/injectox-hero-film-poster.jpg";

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const markReady = () => setReady(true);
    const play = () => {
      if (document.hidden) return;
      void video.play().then(markReady).catch(() => undefined);
    };
    const onVisibility = () => {
      if (!document.hidden) play();
    };

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("playing", markReady);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", play);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play();

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("playing", markReady);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", play);
    };
  }, []);

  return (
    <div className={`hero-film ${ready ? "is-ready" : ""}`}>
      <video
        ref={videoRef}
        className="hero-video hero-video-main"
        poster={posterSrc}
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
