'use client';

import { useVideoPlayer } from './VideoPlayerContext';

function BackgroundVideoYoutube() {
  const { videoRef, onTop, setOnTop } = useVideoPlayer();

  const closeOnTopVideo = () => {
    setOnTop(false);
  };

  return (
<div
  onClick={closeOnTopVideo}
  className={`top-0 right-0 left-0 bottom-0 fixed flex justify-center items-center backdrop-blur-xl transition-all ${
    onTop ? 'z-20' : 'scale-150 -z-20 -top-32'
  }`}
>
  <div
    className="relative w-full max-w-[1450px] overflow-hidden aspect-video"
  >
    <div
      ref={videoRef}
      className="top-0 left-0 absolute w-full h-full"
    />
  </div>
</div>

  );
}

export default BackgroundVideoYoutube;
