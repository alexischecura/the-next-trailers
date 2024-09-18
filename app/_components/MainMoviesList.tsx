'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bebas_Neue } from 'next/font/google';

import { useVideoPlayer } from './VideoPlayerContext';
import { Movie } from '../_lib/data-service';

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

function MainMoviesList({ movies }: { movies: Movie[] }) {
  const { setYoutubeId, youtubeId, currentHomeMovie, setCurrentHomeMovie } =
    useVideoPlayer();

  const selectedMovie = movies[currentHomeMovie];

  useEffect(() => {
    if (
      youtubeId !== selectedMovie.youtubeTrailerId &&
      selectedMovie.youtubeTrailerId
    )
      setYoutubeId(selectedMovie.youtubeTrailerId);
  }, [selectedMovie, youtubeId, setYoutubeId]);

  return (
    <div className="bg-gradient-to-t from-blue-950 to-transparent">
      <section className="mx-auto max-w-7xl text-white">
        <div className="mt-72">
          <h2 className={`text-6xl tracking-tight ${bebas_neue.className}`}>
            {selectedMovie.title}
          </h2>
        </div>
        <div className="flex justify-between mt-6">
          {movies.map((movie, i) => (
            <Link key={movie.id} href={`movie/${movie.id}`}>
              <div className="relative">
    
              <Image
                className={`rounded-lg w-64 h-36 outline-white object-cover border-white${
                  i === currentHomeMovie ? ' border-[3px]' : ' opacity-95'
                }`}
                height="144"
                width="256"
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                onMouseEnter={() => setCurrentHomeMovie(i)}
                alt={movie.title}
                />
                <span className="bottom-2 left-2 absolute w-full font-bold text-gray-100 text-lg">
                  {movie.title}
                </span>
                </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainMoviesList;
