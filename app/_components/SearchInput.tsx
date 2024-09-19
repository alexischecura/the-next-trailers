'use client';

import { useState, useEffect, useCallback } from 'react';
import { searchMovie, Movie } from '../_lib/data-service';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import Image from 'next/image';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOverList, setIsMouseOverList] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, abortSignal: AbortSignal) => {
      if (searchQuery.trim() === '') {
        setMovies([]);
        return;
      }

      try {
        const result = await searchMovie(searchQuery, abortSignal);
        if (result && result.results) {
          setMovies(result.results.slice(0, 3));
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Search error:', error);
        }
      }
    }, 300),
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    debouncedSearch(query, abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [query, debouncedSearch]);

  return (
    <div className="relative w-72">
      <div className="relative">
        <input
          placeholder="Search for movies"
          className="bg-gray-800 bg-opacity-40 p-2 pr-10 rounded-md w-full text-white focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder-gray-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            if (!isMouseOverList) {
              setIsOpen(false);
            }
          }}
        />
        <svg
          className="top-1/2 right-3 absolute w-5 h-5 text-gray-200 transform -translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {movies.length > 0 && (
        <ul 
          className="z-10 absolute bg-gray-800 bg-opacity-40 shadow-lg mt-1 rounded-md w-full"
          onMouseEnter={() => setIsMouseOverList(true)}
          onMouseLeave={() => setIsMouseOverList(false)}
        >
          {isOpen && movies.map((movie) => (
            <li
              key={movie.id}
              className="hover:bg-gray-700 hover:bg-opacity-40 px-4 py-2 rounded-md text-white cursor-pointer"
            >
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-4"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-auto h-24 object-cover"
                  width={200}
                  height={300}
                />
                <div className="flex flex-col">
                  <span className="text-sm">{movie.title}</span>
                  <span className="text-sm">
                    {movie.release_date.slice(0, 4)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
