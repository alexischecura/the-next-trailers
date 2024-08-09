import Link from 'next/link';
import { useEffect, useRef } from 'react';

function BackgroundVideo({
  currentMovie,
  imdbId,
}: {
  currentMovie: number;
  imdbId: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.pause();
      videoElement.src = `trailer-${currentMovie + 1}.mp4`;
      videoElement.load();
      videoElement.play();
    }
  }, [currentMovie]);

  return (
    <Link href={`movie/${imdbId}`}>
      <div className="top-[35%] left-[50%] -z-20 fixed w-dvw h-dvh translate-x-[-50%] translate-y-[-50%]">
        <video
          ref={videoRef}
          className="overflow-visible object-cover"
          autoPlay
          loop
          muted
        />
      </div>
    </Link>
  );
}

export default BackgroundVideo;
