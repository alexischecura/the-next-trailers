const API_KEY = 'df3ee21c3c5003bea28278beee5b2689';

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

/**
 *
 * @param {number} moviesQuantity [moviesQuantity=4] - The number of movies to fetch (maximum 20).
 * @returns A promise that resolves to a list of movies, each with a YouTube trailer ID (if available).
 * @remarks This function makes multiple asynchronous requests to fetch both movie data and their respective trailers.
 */

export async function getMainMoviesAndTrailers(moviesQuantity: number = 4) {
  const urlMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=true&page=1&sort_by=popularity.desc`;

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

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres?: Genres[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country?: string[] | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: ProductionCompanies[] | null;
  production_countries?: ProductionCountries[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: SpokenLanguages[] | null;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface Genres {
  id: number;
  name: string;
}
export interface ProductionCompanies {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}
export interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface Videos {
  results: VideosResults[];
}
export interface VideosResults {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
