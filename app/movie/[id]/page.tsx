import { getMovieDetail } from '@/app/_lib/data-service';

import Movie from '@/app/_components/Movie';

async function Page({ params }: { params: { id: string } }) {
  const movie = await getMovieDetail(params.id);

  if (!movie) return null;

  return (
    <>
      <section className="bg-gradient-to-t from-blue-950 to-transparent pb-10 text-white">
        <Movie movie={movie} />
      </section>
      <div className="bg-blue-950 h-[1000px]"></div>
    </>
  );
}

export default Page;
