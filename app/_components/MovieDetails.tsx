import Image from 'next/image';
import { MovieDetail, Credits } from '../_lib/data-service';
import { Bebas_Neue } from 'next/font/google';

const bebas_neue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

const MovieDetails = ({
  movie,
  credits,
}: {
  movie: MovieDetail;
  credits: Credits;
}) => {
  return (
    <div className="mx-auto pt-8 max-w-7xl text-white">
      <h2 className={`mb-4 font-bold text-3xl ${bebas_neue.className}`}>
        Description
      </h2>
      <p className="mb-6">{movie.overview}</p>

      <h2 className={`mb-4 font-bold text-3xl ${bebas_neue.className}`}>
        Actors
      </h2>
      <ul className="flex gap-16">
        {credits.cast.slice(0, 4).map((actor) => (
          <li key={actor.id} className="text-center">
            <Image
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="mx-auto mb-2 rounded-full w-24 h-24 object-cover"
              width={96}
              height={96}
            />
            <p className="font-semibold">{actor.name}</p>
          </li>
        ))}
      </ul>
      <h2 className={`mb-4 font-bold text-3xl ${bebas_neue.className}`}>
        Genres
      </h2>
      <ul className="flex flex-wrap gap-2 mb-6">
        {movie.genres.map((genre) => (
          <li
            key={genre.id}
            className="bg-green-500 px-3 py-1 rounded-full font-semibold"
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
