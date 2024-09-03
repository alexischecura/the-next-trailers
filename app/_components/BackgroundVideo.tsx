'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

function BackgroundVideo({
  imdbId,
  youtubeId,
  onTop = false,
}: {
  imdbId: string;
  youtubeId: string;
  onTop?: boolean;
}) {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && videoElement.contentWindow) {
      videoElement.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1`;
    }
  }, [youtubeId]);

  return (
    <Link href={`movie/${imdbId}`}>
      <div
        className={`top-0 right-0 left-0 fixed m-auto w-full transition-all max-w-7xl ${
          onTop
            ? 'scale-100 z-20 bottom-0 flex items-center'
            : 'scale-150 -z-20'
        }`}
      >
        <div className="relative pt-[56.25%] w-full overflow-hidden">
          <iframe
            ref={videoRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1`}
            title="Trailer Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
            className="top-0 right-0 bottom-0 left-0 absolute my-auto w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
    </Link>
  );
}

export default BackgroundVideo;
