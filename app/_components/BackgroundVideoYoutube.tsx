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
      className={`top-0 right-0 left-0 bottom-0 fixed flex justify-center items-center transition-all ${
        onTop ? 'z-20 bg-black bg-opacity-50' : 'scale-150 -z-20 -top-32'
      }`}
    >
      <div
        className="relative w-full max-w-[1450px] overflow-hidden aspect-video"
      >
        <div
          ref={videoRef}
          className="top-0 left-0 absolute w-full h-full"
          onClick={(e) => e.stopPropagation()}
        />
        {onTop && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeOnTopVideo();
            }}
            className={`top-6 right-6 fixed flex justify-center items-center bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-14 h-14 transition-all`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default BackgroundVideoYoutube;
