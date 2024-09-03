'use client';

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type VideoContextType = {
  youtubeId: string;
  setYoutubeId: Dispatch<SetStateAction<string>>;
  onTop: boolean;
  setOnTop: Dispatch<SetStateAction<boolean>>;
  currentHomeMovie: number;
  setCurrentHomeMovie: Dispatch<SetStateAction<number>>;
};

const VideoPlayerContext = createContext<VideoContextType | undefined>(
  undefined
);

function VideoPlayerProvider({ children }: PropsWithChildren) {
  const [youtubeId, setYoutubeId] = useState('');
  const [currentHomeMovie, setCurrentHomeMovie] = useState(0);
  const [onTop, setOnTop] = useState(false);

  return (
    <VideoPlayerContext.Provider
      value={{
        onTop,
        setOnTop,
        setYoutubeId,
        youtubeId,
        currentHomeMovie,
        setCurrentHomeMovie,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
}

function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (context === undefined)
    throw new Error('Context was used outside priveder');

  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  const { youtubeId, onTop } = context;

  useEffect(() => {
    if (!videoRef.current) return;

    const loadYouTubeAPI = () => {
      if (window.YT) {
        createOrUpdatePlayer();
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        (window as any).onYouTubeIframeAPIReady = createOrUpdatePlayer;
      }
    };

    const createOrUpdatePlayer = () => {
      if (playerRef?.current?.loadVideoById) {
        playerRef?.current?.loadVideoById(youtubeId);
      } else {
        if (videoRef.current) {
          playerRef.current = new window.YT.Player(videoRef.current, {
            videoId: youtubeId || 'M3oVoMTrKvw',
            playerVars: {
              autoplay: 1,
              loop: 1,
              mute: 1,
              rel: 0,
              playlist: youtubeId || 'M3oVoMTrKvw',
            },
          });
        }
      }
    };

    loadYouTubeAPI();
  }, [youtubeId]);

  useEffect(() => {
    if (playerRef.current) {
      if (onTop) {
        playerRef.current.unMute();
        playerRef.current.seekTo(0);
      } else {
        playerRef.current.mute();
        playerRef.current.playVideo();
      }
    }
  }, [onTop]);

  return { videoRef, ...context };
}

export { VideoPlayerProvider, useVideoPlayer };
