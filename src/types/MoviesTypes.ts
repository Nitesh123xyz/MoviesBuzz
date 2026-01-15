interface MoviesDetails {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  spoken_languages: { name: string }[];
  adult: boolean;
  genres: { name: string }[];
  overview: string;
}
export type { MoviesDetails };
