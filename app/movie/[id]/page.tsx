import { getMovieDetail, getCredits } from '@/app/_lib/data-service';
import Movie from '@/app/_components/Movie';
import MovieDetails from '@/app/_components/MovieDetails';

async function Page({ params }: { params: { id: string } }) {
  const [movie, credits] = await Promise.all([
    getMovieDetail(params.id),
    getCredits(params.id),
  ]);

  if (!movie || !credits) return null;

  return (
    <>
      <section className="bg-gradient-to-t from-blue-950 to-transparent pb-10 text-white">
        <Movie movie={movie} />
      </section>
      <div className="bg-blue-950">
        <MovieDetails movie={movie} credits={credits} />
      </div>
    </>
  );
}

export default Page;
