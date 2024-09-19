import { getMovieDetail, getCredits, getRecommendedMovies } from '../../_lib/data-service';
import Movie from '@/app/_components/Movie'
import MovieDetails from '../../_components/MovieDetails';

export default async function Page({ params }: { params: { id: string } }) {
  const movie = await getMovieDetail(params.id);
  const credits = await getCredits(params.id);
  const recommendedMovies = await getRecommendedMovies(params.id);

  if (!movie || !credits || !recommendedMovies) return null;

  return (
    <>
      <section className="bg-gradient-to-t from-blue-950 to-transparent pb-10 text-white">
        <Movie movie={movie} />
      </section>
      <div className="bg-blue-950">
        <MovieDetails 
        movie={movie} 
        credits={credits} 
        recommendedMovies={recommendedMovies}
      />
      </div>
    </>
  );
}
