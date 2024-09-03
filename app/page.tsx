import MainMoviesList from './_components/MainMoviesList';
import WeekMoviesList from './_components/WeekMoviesList';
import { getMainMoviesAndTrailers } from './_lib/data-service';

async function Page() {
  const movies = await getMainMoviesAndTrailers();
  if (!movies) return null;
  
  return (
    <>
      <MainMoviesList movies={movies.results} />
      <WeekMoviesList />
    </>
  );
}

export default Page;
