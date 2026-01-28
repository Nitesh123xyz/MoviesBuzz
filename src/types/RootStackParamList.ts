export type RootStackParamList = {
  // TabNavigator: undefined;
  HomeStackNavigation: undefined;
  Home: undefined;
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
  Profile: undefined;
  Genres: undefined;
  CustomTabBar: undefined;
};

// export type RootStackParamList = {
//   Home: undefined;
//   Search: undefined;
//   Library: undefined;
//   Favorite: undefined;
//   Profile: undefined;

//   Login: undefined;
//   SignUp: undefined;
//   DetailsScreen: { movieId: number };
// };
