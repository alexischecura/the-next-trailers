import Link from 'next/link';
import { useEffect, useRef } from 'react';

function BackgroundVideo({
  imdbId,
  youtubeId,
}: {
  imdbId: string;
  youtubeId: string;
}) {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && videoElement.contentWindow) {
      videoElement.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
      videoElement.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}`;
      videoElement.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    }
  }, [youtubeId]);

  return (
    <Link href={`movie/${imdbId}`}>
      <div className="-top-36 left-0 -z-20 fixed w-full h-[1100px]">
        <iframe
          ref={videoRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}`}
          title="Trailer Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full"
        />
      </div>
    </Link>
  );
}

export default BackgroundVideo;
