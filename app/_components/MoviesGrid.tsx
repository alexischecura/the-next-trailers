import Link from "next/link";
import { Movies } from "../_lib/data-service";
import Image from "next/image";
import NoPosterPlaceholder from "./NoPosterPlaceholder";

export default function MoviesGrid({ movies, quantity }: { movies: Movies, quantity: number }) {

  return (
  <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-4">
  {movies.results.slice(0, quantity).map((movie) => (
    <Link
      key={movie.id}
      href={`/movie/${movie.id}`}
      className="block hover:scale-105 transition-all duration-300"
    >
      <div className="bg-blue-900 bg-opacity-30 shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300 overflow-hidden">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto object-cover"
            width={300}
            height={450}
          />
        ) : (
          <NoPosterPlaceholder />
        )}
        <div className="p-4">
          <h3 className="line-clamp-2 font-semibold text-gray-100 text-sm">
            {movie.title.slice(0, 20)}
            {movie.title.length > 20 ? '...' : ''}
          </h3>
          <p className="mt-1 text-gray-400 text-xs">
            {movie.release_date ? movie.release_date.slice(0, 4) : "Unconfirmed year"}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>
  )
}
