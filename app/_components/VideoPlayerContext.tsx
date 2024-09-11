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
  isFirstTimeOnTop: boolean;
  setIsFirstTimeOnTop: Dispatch<SetStateAction<boolean>>;
};

const VideoPlayerContext = createContext<VideoContextType | undefined>(
  undefined
);

function VideoPlayerProvider({ children }: PropsWithChildren) {
  const [youtubeId, setYoutubeId] = useState('');
  const [currentHomeMovie, setCurrentHomeMovie] = useState(0);
  const [onTop, setOnTop] = useState(false);
  const [isFirstTimeOnTop, setIsFirstTimeOnTop] = useState(true);

  return (
    <VideoPlayerContext.Provider
      value={{
        onTop,
        setOnTop,
        setYoutubeId,
        youtubeId,
        currentHomeMovie,
        setCurrentHomeMovie,
        isFirstTimeOnTop,
        setIsFirstTimeOnTop,
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

  const { youtubeId, onTop, isFirstTimeOnTop, setIsFirstTimeOnTop } = context;

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
      setIsFirstTimeOnTop(true);
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
            },
          });
        }
      }
    };

    loadYouTubeAPI();
  }, [youtubeId, setIsFirstTimeOnTop]);

  useEffect(() => {
    if (playerRef.current) {
      if (onTop) {
        playerRef.current.unMute();
        if (isFirstTimeOnTop) {
          playerRef.current.seekTo(0);
          setIsFirstTimeOnTop(false);
        }
      } else {
        playerRef.current.mute();
        playerRef.current.playVideo();
      }
    }
  }, [onTop, isFirstTimeOnTop, setIsFirstTimeOnTop]);

  return { videoRef, ...context };
}

export { VideoPlayerProvider, useVideoPlayer };
