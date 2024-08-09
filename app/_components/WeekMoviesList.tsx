import Image from 'next/image';
import { mainMovies } from '../data/movies';

function WeekMoviesList() {
  return (
    <section className="bg-blue-950 pt-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h3 className='mb-6 font-semibold text-xl'>🔥 TRENDING THIS WEEK</h3>
        <div className="flex justify-between">
          {mainMovies.map((movie) => {
            return (
              <div key={movie.imdbID}>
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  height="300"
                  width="200"
                  className="rounded-2xl"
                />
                <h5>{movie.Title}</h5>
                <p>{movie.Released}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WeekMoviesList;
