'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Bebas_Neue } from 'next/font/google';

import { useVideoPlayer } from './VideoPlayerContext';
import { MovieDetail } from '../_lib/data-service';
import { format, formatDate } from 'date-fns';

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

function Movie({ movie }: { movie: MovieDetail }) {
  const {
    setOnTop,
    setYoutubeId,
    youtubeId: currentYoutubeId,
  } = useVideoPlayer();

  const youtubeId = movie.videos?.results
    .filter((video) => video.type === 'Trailer')
    .at(0)?.key;

  useEffect(() => {
    if (youtubeId && youtubeId !== currentYoutubeId) setYoutubeId(youtubeId);
  }, [youtubeId, currentYoutubeId, setYoutubeId]);

  return (
    <>
      <div className="mx-auto mt-72 max-w-7xl">
        {/* <p className="font-medium text-xl">{movie.director}</p> */}
        <h2 className={`text-6xl tracking-tight ${bebas_neue.className}`}>
          {movie.title}
        </h2>
      </div>
      <div className="flex justify-between mx-auto mt-6 max-w-7xl">
        <button onClick={() => setOnTop((onTop) => !onTop)}>
          <Box styleClasses="bg-green-500">
            <svg
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="44px"
              height="44px"
              viewBox="0 0 163.861 163.861"
            >
              <g>
                <path
                  d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
            c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"
                />
              </g>
            </svg>
          </Box>
        </button>
        <Box title="BUDGET">$ {movie.budget}</Box>
        <Box title="RELEASE">{format(movie.release_date, 'MMMM d, yyyy')}</Box>
        <Box title="LENGTH">{movie.runtime} min</Box>
        <Box title="IMDB">{movie.vote_average.toFixed(1)}</Box>
      </div>
    </>
  );
}

function Box({
  children,
  title,
  styleClasses: stylesClasses = 'bg-gray-800 bg-opacity-40',
}: PropsWithChildren<{
  title?: string;
  styleClasses?: string;
}>) {
  return (
    <div
      className={`relative rounded-3xl w-44 h-28 ${stylesClasses} ${bebas_neue.className}`}
    >
      {title && (
        <h6 className="top-[40%] -left-1 absolute font-medium text-center text-gray-500 uppercase -rotate-90">
          {title}
        </h6>
      )}
      <p className="flex justify-center items-center h-full font-bold text-3xl tracking-tight">
        {children}
      </p>
    </div>
  );
}

export default Movie;