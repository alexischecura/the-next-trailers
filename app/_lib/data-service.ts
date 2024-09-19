const API_KEY: string = process.env.API_KEY!;

export async function getMovieDetail(id: string) {
  const movieURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

  try {
    const movieRes = await fetch(movieURL);

    if (!movieRes.ok)
      throw new Error('Something went wrong with fetching the movie');

    const data = (await movieRes.json()) as MovieDetail;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchMovie(query: string, signal?: AbortSignal) {
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  try {
    const res = await fetch(searchURL, { signal });

    if (!res.ok)
      throw new Error('Something went wrong with fetching the movie');

    const data = (await res.json()) as Movies;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPopularWeekMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

  try {
    const res = await fetch(url);

    if (!res.ok)
      throw new Error('Something went wrong with fetching the movies');

    const data = (await res.json()) as Movies;

    return data;
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {number} moviesQuantity [moviesQuantity=4] - The number of movies to fetch (maximum 20).
 * @returns A promise that resolves to a list of movies, each with a YouTube trailer ID (if available).
 * @remarks This function makes multiple asynchronous requests to fetch both movie data and their respective trailers.
 */

export async function getMainMoviesAndTrailers(moviesQuantity: number = 4) {
  const urlMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=1`;

  try {
    const res = await fetch(urlMovies);

    if (!res.ok)
      throw new Error('Something went wrong with fetching the movies');

    const data = (await res.json()) as Movies;
    data.results = data.results.slice(0, moviesQuantity);

    const moviesPromises = data.results.map(async (movie) => {
      const urlVideos = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`;
      const resVideos = await fetch(urlVideos);

      if (!resVideos.ok) {
        console.error(`Failed to fetch trailer for movie: "${movie.title}"`);
        return movie;
      }

      const videosData = (await resVideos.json()) as Videos;

      const youtubeTrailerId = videosData.results
        .filter((video) => video.type === 'Trailer')
        .at(0)?.key;
      if (youtubeTrailerId) movie.youtubeTrailerId = youtubeTrailerId;

      return movie;
    });

    const moviesWithTrailers = await Promise.all(moviesPromises);

    return { ...data, results: moviesWithTrailers };
  } catch (error) {
    console.error(error);
  }
}

export async function getMovies() {
  const urlMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=true&page=1&sort_by=popularity.desc`;

  try {
    const res = await fetch(urlMovies);

    if (!res.ok)
      throw new Error('Something went wrong with fetching the movies');

    const data = (await res.json()) as Movies;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecommendedMovies(movieId: string) {
  const urlRecommendedMovies = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
  try {
    const res = await fetch(urlRecommendedMovies);

    if (!res.ok)
      throw new Error('Something went wrong with fetching the movies');

    const data = (await res.json()) as Movies;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCredits(movieId: string) {
  const creditsURL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;

  try {
    const creditsRes = await fetch(creditsURL);

    if (!creditsRes.ok)
      throw new Error('Algo salió mal al obtener los créditos de la película');

    const data = (await creditsRes.json()) as Credits;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMoviesActor(actorId: string) {
  const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`;

  try {
    const res = await fetch(url);

    if (!res.ok)
      throw new Error("Something went wrong with fetching the actor's movies");

    const data = await res.json();

    return { results: data.cast } as Movies;
  } catch (error) {
    console.error(error);
  }
}

export async function getActorInfo(actorId: string) {
  const url = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}`;

  try {
    const res = await fetch(url);

    if (!res.ok)
      throw new Error('Something went wrong with fetching the actor info');

    const data = await res.json();

    return data as Actor;
  } catch (error) {
    console.error(error);
  }
}

export type Movies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[] | null;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  youtubeTrailerId: string | null;
};

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
};

export type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Videos = {
  results: VideoResult[];
};

export type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: VideoSite;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: Date;
  id: string;
};

export enum VideoSite {
  YouTube = 'YouTube',
}

export enum VideoType {
  BehindTheScenes = 'Behind the Scenes',
  Clip = 'Clip',
  Featurette = 'Featurette',
  Teaser = 'Teaser',
  Trailer = 'Trailer',
}

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Cast[];
};

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
};

export enum Department {
  Acting = 'Acting',
  Art = 'Art',
  Camera = 'Camera',
  CostumeMakeUp = 'Costume & Make-Up',
  Crew = 'Crew',
  Directing = 'Directing',
  Editing = 'Editing',
  Lighting = 'Lighting',
  Production = 'Production',
  Sound = 'Sound',
  VisualEffects = 'Visual Effects',
  Writing = 'Writing',
}

export type Actor = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: Date;
  deathday: null;
  gender: number;
  homepage: null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};
