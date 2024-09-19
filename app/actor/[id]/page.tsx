import { getMoviesActor, getActorInfo } from '../../_lib/data-service';
import Actor from '../../_components/Actor';
import MoviesGrid from '../../_components/MoviesGrid';

export default async function Page({ params }: { params: { id: string } }) {
  const moviesActor = await getMoviesActor(params.id);
  const actor = await getActorInfo(params.id);

  if (!moviesActor || !actor) return null;

  return (
    <main className="bg-blue-950">
      <section className="bg-gradient-to-t from-blue-950 to-transparent pb-10 text-white">
        <Actor actor={actor} />
      </section>
      <section className="mx-auto px-4 py-8 container">
        <h2 className="mb-4 font-bold text-2xl text-white">Movies</h2>
        <MoviesGrid movies={moviesActor} quantity={20} />
      </section>
    </main>
  );
}