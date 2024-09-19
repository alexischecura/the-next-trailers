import { getPopularWeekMovies } from '../_lib/data-service';
import MoviesGrid from './MoviesGrid';

async function WeekMoviesList() {
  const popularWeekMovies = await getPopularWeekMovies();

  if (!popularWeekMovies) return null;

  return (
    <section className="bg-blue-950 pt-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h3 className="mb-6 font-semibold text-xl">🔥 TRENDING THIS WEEK</h3>
        <MoviesGrid movies={popularWeekMovies} quantity={10} />
      </div>
    </section>
  );
}

export default WeekMoviesList;
