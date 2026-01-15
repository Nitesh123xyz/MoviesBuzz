export type RootStackParamList = {
  TabNavigator: undefined;
  HomeMain: undefined;
  DetailsScreen: { movieId: string | number };
  MovieDetails: { movieId: string | number };
  PersonScreen: { castId: string | number };
  Cast: undefined;
  Favorite: undefined;
  Library: undefined;
  Search: undefined;
  SeeAll: { title: string | number };
  SignUp: undefined;
  Login: undefined;
};
