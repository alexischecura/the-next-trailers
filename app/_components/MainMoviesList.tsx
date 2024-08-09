'use client';

import { useState } from 'react';
import { mainMovies } from '../data/movies';
import BackgroundVideo from './BackgroundVideo';
import Link from 'next/link';
import Image from 'next/image';

function MainMoviesList() {
  const [currentMovie, setCurrentMovie] = useState(0);

  const selectedMovie = mainMovies[currentMovie];

  return (
    <div className="bg-gradient-to-t from-blue-950 to-transparent">
      <section className="mx-auto max-w-7xl text-white">
        <BackgroundVideo
          currentMovie={currentMovie}
          imdbId={selectedMovie.imdbID}
        />
        <div className="mt-64">
          <h2 className="mt-auto font-bold text-5xl uppercase">
            {selectedMovie.Title}
          </h2>
        </div>
        <div className="flex justify-between mt-4">
          {mainMovies.map((movie, i) => (
            <Link key={movie.imdbID} href={`movie/${movie.imdbID}`}>
              <Image
                className={`rounded-lg w-64 h-36 outline-white object-cover border-white${
                  i === currentMovie ? ' border-[3px]' : ' opacity-95'
                }`}
                height="144"
                width="256"
                src={movie.Poster}
                onMouseEnter={() => setCurrentMovie(i)}
                alt={movie.Title}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainMoviesList;
