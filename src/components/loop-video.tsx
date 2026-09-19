"use client";

import { useEffect, useRef, useState } from "react";

type LoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  onLoop?: () => void;
};

export function LoopVideo({ src, poster, className, preload = "auto", onLoop }: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const lastLoopRef = useRef(0);
  const loopReadyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    loopReadyRef.current = video.currentTime < 0.5;
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
    const onTimeUpdate = () => {
      if (!onLoop || !video.duration) return;
      if (video.currentTime < 0.5) {
        loopReadyRef.current = true;
        return;
      }
      if (!loopReadyRef.current || video.currentTime < video.duration - 0.25) return;
      const now = Date.now();
      if (now - lastLoopRef.current < 1000) return;
      lastLoopRef.current = now;
      loopReadyRef.current = false;
      onLoop();
    };

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("playing", markReady);
    video.addEventListener("timeupdate", onTimeUpdate);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", play);

    if (video.readyState >= 2) play();

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("playing", markReady);
      video.removeEventListener("timeupdate", onTimeUpdate);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", play);
    };
  }, [onLoop, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={ready ? undefined : poster}
      autoPlay
      muted
      loop
      playsInline
      preload={shouldLoad ? preload : "none"}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noplaybackrate"
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
