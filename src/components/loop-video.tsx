"use client";

import { useEffect, useRef, useState } from "react";

type LoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
};

export function LoopVideo({ src, poster, className, preload = "auto" }: LoopVideoProps) {
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
      const promise = video.play();
      if (promise) promise.then(markReady).catch(() => undefined);
    };
    const onVisibility = () => {
      if (!document.hidden) play();
    };

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("playing", markReady);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", play);

    if (video.readyState >= 2) play();

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("playing", markReady);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", play);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={ready ? undefined : poster}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
