import { Check, Heart, Plus, Send } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import { IMAGE_BASE_URL } from '@env';
import { BackUpPosterImage } from '../utils/Backup';
import {
  useAddFavoriteMoviesMutation,
  useAddWatchListMoviesMutation,
  useGetCastQuery,
  useGetFavoriteMoviesQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetWatchListMoviesQuery,
} from '../features/movies';
import MovieList from '../components/MovieList';
import { DateFormatter, TimerFormatter } from '../utils/Formatter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { movieId } = route?.params;

  // -----------------------------------------

  const { data: MoviesDetails, isLoading } = useGetMovieDetailsQuery(movieId);
  const { data: Casts, isLoading: CastsLoading } = useGetCastQuery(movieId);
  const { data: SimilarMovies, isLoading: SimilarMoviesLoading } =
    useGetSimilarMoviesQuery(movieId);
  // ----------------------------------------
  const { data: favData, refetch: FavoriteMoviesRefetch } =
    useGetFavoriteMoviesQuery();
  const FavResults = favData?.results ?? [];
  const isFavoriteMovie = FavResults?.some(movie => movie.id === movieId);

  // ----------------------------------------

  const { data: watchData, refetch: WatchListMoviesRefetch } =
    useGetWatchListMoviesQuery();
  const WatchResult = watchData?.results ?? [];
  const isWatchListMovie = WatchResult?.some(movie => movie.id === movieId);

  // ----------------------------------------

  const insets = useSafeAreaInsets();

  // ----------------------------------------

  const [addFavoriteMovies] = useAddFavoriteMoviesMutation();
  const [addWatchListMovies] = useAddWatchListMoviesMutation();
  let PosterImage = '';
  if (isLoading) {
    return (
      <>
        <View className="flex-1 h-screen justify-center items-center">
          <ActivityIndicator size={35} color="#fff" />
        </View>
      </>
    );
  }
  if (!!MoviesDetails?.backdrop_path) {
    PosterImage = `${IMAGE_BASE_URL}${MoviesDetails?.backdrop_path}`;
  } else if (!!MoviesDetails?.poster_path) {
    PosterImage = `${IMAGE_BASE_URL}${MoviesDetails?.poster_path}`;
  } else {
    PosterImage = BackUpPosterImage;
  }

  const showToastWithGravity = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      0,
      60,
    );
  };

  const handleAddToWatchList = async () => {
    const favData = {
      media_type: 'movie',
      media_id: movieId,
      watchlist: isWatchListMovie ? false : true,
    };
    const { data } = await addWatchListMovies(favData);
    const { success, status_message } = data || {};
    if (success) {
      WatchListMoviesRefetch();
      showToastWithGravity(status_message);
    }
  };

  const handleFavoriteToggle = async () => {
    const favData = {
      media_type: 'movie',
      media_id: movieId,
      favorite: isFavoriteMovie ? false : true,
    };
    const { data } = await addFavoriteMovies(favData);
    const { success, status_message } = data || {};
    if (success) {
      FavoriteMoviesRefetch();
      showToastWithGravity(status_message);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" className="bg-neutral-800" />
      <ScrollView
        className="flex-1 bg-neutral-900"
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: insets.top }}
      >
        <View className="w-full">
          {/* Poster with Gradient */}
          <View className="mb-5">
            <ImageBackground
              source={{
                uri: PosterImage,
              }}
              style={{
                width: screenWidth,
                height: screenHeight * 0.3,
                justifyContent: 'flex-end',
              }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(23,23,23,0.5)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                }}
              />
            </ImageBackground>
          </View>
        </View>
        {/* Movie Info */}
        <View className="px-2">
          <Text
            numberOfLines={1}
            className="text-xl text-center font-bold text-white"
          >
            {MoviesDetails?.title}
          </Text>

          <View className="w-full flex-row items-center justify-center mt-5 gap-2 rounded-lg px-2">
            <View className="border-r-[1px] border-r-neutral-200 px-2 items-center">
              <Text className="text-white text-[0.85rem]">
                {DateFormatter(MoviesDetails?.release_date)}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-200 px-2 items-center">
              <Text className="text-white text-[0.85rem]">
                {TimerFormatter(MoviesDetails?.runtime)}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-200 px-2 items-center">
              <Text className="text-[0.85rem] text-white">
                {MoviesDetails?.spoken_languages?.length > 2
                  ? MoviesDetails?.spoken_languages?.length + ' Languages'
                  : MoviesDetails?.spoken_languages
                      ?.map(info => info?.name)
                      .join(', ')}
              </Text>
            </View>
            <Text className="text-[0.85rem] text-neutral-200">
              <Text className="text-white">Adult : </Text>
              {MoviesDetails?.adult ? 'Yes' : 'No'}
            </Text>
          </View>

          <View className="w-full my-5">
            <Text className="text-[0.85rem] text-center text-neutral-200">
              {MoviesDetails?.genres?.map(g => g.name).join(' | ')}
            </Text>
          </View>

          <Text
            allowFontScaling={false}
            numberOfLines={8}
            className="text-[0.84rem] leading-5 text-neutral-400"
          >
            {MoviesDetails?.overview}
          </Text>

          <View className="w-full flex-row items-center justify-between px-4 my-8">
            <TouchableOpacity
              onPress={() => handleAddToWatchList()}
              className="flex items-center justify-center gap-1"
            >
              {isWatchListMovie ? (
                <Check color={'white'} size={20} />
              ) : (
                <Plus color={'white'} size={20} />
              )}
              <Text className="text-white text-[0.7rem]">WatchList</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center gap-1">
              <Send color={'white'} size={20} />
              <Text className="text-white text-[0.7rem]">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFavoriteToggle()}
              className={`flex items-center justify-center gap-1 }`}
            >
              <Heart color={`${isFavoriteMovie ? 'red' : 'white'}`} size={20} />
              <Text className="text-white text-[0.7rem]">Rate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {Casts?.cast.length > 0 && (
          <Cast navigation={navigation} Casts={Casts} loader={CastsLoading} />
        )}

        <View>
          {SimilarMovies?.total_results > 0 && (
            <MovieList
              title="Similar Movies"
              MoviesApi={SimilarMovies}
              loader={SimilarMoviesLoading}
              hideSeeAll={true}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;
