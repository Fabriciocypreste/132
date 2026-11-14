import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import {
  HLS_STREAM_SOURCES,
  selectHlsPlaybackStrategy,
} from '../utils/streaming';

interface HlsBackgroundVideoProps {
  className?: string;
}

export const HlsBackgroundVideo: React.FC<HlsBackgroundVideoProps> = ({
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [hasActiveVideo, setHasActiveVideo] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const currentSource = HLS_STREAM_SOURCES[sourceIndex];
    if (!currentSource) return;

    const strategy = selectHlsPlaybackStrategy({
      isHlsJsSupported: Hls.isSupported(),
      canPlayNativeHls: Boolean(
        video.canPlayType('application/vnd.apple.mpegurl'),
      ),
    });

    let hls: Hls | null = null;
    let cancelled = false;

    const handleLoadedMetadata = () => {
      if (!cancelled && currentSource.id === 'mux-showcase' && video.currentTime < 26) {
        video.currentTime = 28;
      }
    };

    const handleCanPlay = () => {
      if (!cancelled) {
        if (currentSource.id === 'mux-showcase' && video.currentTime < 24) {
          video.currentTime = 28;
          return;
        }
        setHasActiveVideo(true);
        video.play().catch(() => {
          // Autoplay may be blocked if unmuted; keep muted fallback safe
        });
      }
    };

    const handleVideoError = () => {
      if (!cancelled && sourceIndex < HLS_STREAM_SOURCES.length - 1) {
        setSourceIndex((prev) => prev + 1);
      } else if (!cancelled) {
        setHasActiveVideo(false);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleVideoError);

    if (strategy === 'hls.js') {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 30,
      });

      hls.loadSource(currentSource.url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!cancelled) {
          video.play().catch(() => {});
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal && !cancelled) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            if (sourceIndex < HLS_STREAM_SOURCES.length - 1) {
              setSourceIndex((prev) => prev + 1);
            } else {
              hls?.destroy();
              setHasActiveVideo(false);
            }
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls?.recoverMediaError();
          } else {
            hls?.destroy();
            setHasActiveVideo(false);
          }
        }
      });
    } else if (strategy === 'native') {
      video.src = currentSource.url;
    }

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleVideoError);
      if (hls) {
        hls.destroy();
      }
    };
  }, [sourceIndex]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="false"
    >
      {/* Base cinematic orange depth backdrop (always visible beneath video) */}
      <div className="mfp-cinematic-bg absolute inset-0" />

      {/* Warm subtle volumetric glow layers for 3D cinematic depth */}
      <div
        className="absolute -top-36 left-1/2 h-[540px] w-[960px] -translate-x-1/2 rounded-full opacity-55 blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,121,14,0.85) 0%, rgba(255,90,0,0.4) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-[-10%] h-[420px] w-[620px] rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(132,32,0,0.95) 0%, rgba(200,50,0,0.45) 55%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Fullscreen HLS background video */}
      <video
        ref={videoRef}
        data-testid="hls-background-video"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover mix-blend-luminosity transition-opacity duration-700 ${
          hasActiveVideo ? 'opacity-45' : 'opacity-0'
        }`}
      />

      {/* Dark orange chromatic tint over video so frames unify with brand palette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg, rgba(255, 90, 0, 0.42) 0%, rgba(200, 50, 0, 0.56) 55%, rgba(132, 32, 0, 0.85) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Dark orange overlays on the four extremities */}
      <div className="mfp-video-edge-overlay absolute inset-0" aria-hidden="true" />

      {/* Subtle HLS stream media controls (accessible & unobtrusive) */}
      <div className="pointer-events-auto absolute right-4 bottom-6 z-20 flex items-center gap-2 sm:right-8 sm:bottom-8">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPaused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo'}
          className="mfp-glass-chip-control inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#FFF8F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Ativar áudio do vídeo de fundo' : 'Silenciar vídeo de fundo'}
          className="mfp-glass-chip-control inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#FFF8F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8F2]"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};
