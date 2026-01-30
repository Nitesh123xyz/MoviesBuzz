export type RootStackParamList = {
  HomeStackNavigation: undefined;
  Home: undefined;
  DetailsScreen: { movieId: string | number };
  MovieDetails: { movieId: string | number };
  PersonScreen: { castId: string | number };
  Cast: undefined;
  Favorite: undefined;
  Library: undefined;
  Search: undefined;
  SeeAll: {
    title?: string | number;
    genreId?: string | number;
    genreName: string;
  };
  SignUp: undefined;
  Login: undefined;
  Profile: undefined;
  Genres: { genreId: string | number };
  CustomTabBar: undefined;
};
