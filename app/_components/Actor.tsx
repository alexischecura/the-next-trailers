import Image from "next/image";
import { format } from "date-fns";
import { Actor as ActorType } from "../_lib/data-service";

export default function Actor({ actor }: { actor: ActorType }) {
  return (
    <div className="mx-auto py-8 max-w-7xl container">
      <div className="flex md:flex-row flex-col items-center md:items-start gap-8">
        {actor.profile_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            width={300}
            height={450}
            className="shadow-lg rounded-lg"
          />
        )}
        <div className="text-center md:text-left">
          <h1 className="mb-4 font-bold text-3xl">{actor.name}</h1>
          {actor.birthday && (
            <p className="mb-2">
              <span className="font-semibold">Born:</span> {format(actor.birthday, 'MMMM d, yyyy')}
            </p>
          )}
          {actor.place_of_birth && (
            <p className="mb-2">
              <span className="font-semibold">Place of Birth:</span> {actor.place_of_birth}
            </p>
          )}
          {actor.biography && (
            <div className="mt-4">
              <h2 className="mb-2 font-semibold text-2xl">Biography</h2>
              <p className="text-sm">{actor.biography}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
