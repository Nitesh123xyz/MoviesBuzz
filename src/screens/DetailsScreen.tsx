import { Check, Heart, Plus, Send } from 'lucide-react-native';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
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
  useGetCastQuery,
  useGetFavoriteMoviesQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetWatchListMoviesQuery,
} from '../features/movies';
import MovieList from '../components/MovieList';
import { DateFormatter, TimerFormatter } from '../utils/Formatter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProtectedAction } from '../utils/UserAuth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useColorScheme } from 'nativewind';
import { RootStackParamList } from 'src/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MoviesDetails } from 'src/types/MoviesTypes';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'DetailsScreen'>;

const DetailsScreen = ({ route, navigation }: Props) => {
  const { movieId } = route?.params;
  const performAction = useProtectedAction();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  // -----------------------------------------

  const { data: MoviesDetails, isLoading } = useGetMovieDetailsQuery(movieId);
  const { data: Casts, isLoading: CastsLoading } = useGetCastQuery(movieId);
  const { data: SimilarMovies, isLoading: SimilarMoviesLoading } =
    useGetSimilarMoviesQuery(movieId);
  // ----------------------------------------
  const { data: favData, refetch: FavoriteMoviesRefetch } =
    useGetFavoriteMoviesQuery({});
  const FavResults = favData?.results ?? [];
  const isFavoriteMovie = FavResults?.some(
    (movie: { id: string }) => movie.id === movieId,
  );

  // ----------------------------------------

  const { data: watchData, refetch: WatchListMoviesRefetch } =
    useGetWatchListMoviesQuery({});
  const WatchResult = watchData?.results ?? [];
  const isWatchListMovie = WatchResult?.some(
    (movie: { id: string }) => movie.id === movieId,
  );

  // ----------------------------------------

  const insets = useSafeAreaInsets();

  // ----------------------------------------

  const [addFavoriteMovies] = useAddFavoriteMoviesMutation();

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

  const showToastWithGravity = (message: string) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const handleAddToWatchList = async (MovieInfo: MoviesDetails) => {
    console.log(MovieInfo);
    performAction(async () => {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        showToastWithGravity('User not authenticated');
        return;
      }
      const uid: string = currentUser.uid;

      try {
        await firestore()
          .collection('users')
          .doc(uid)
          .collection('WatchList')
          .doc(String(MovieInfo?.id)) // Fix: TMDB uses 'id', not 'movieId'
          .set({
            movieId: MovieInfo?.id, // Fix: Ensure this isn't undefined
            title: MovieInfo?.title || 'Unknown Title',
            poster_path: MovieInfo?.poster_path || '',
            watchlist: !isWatchListMovie,
            // addedAt: firestore.FieldValue.serverTimestamp(),
          });

        showToastWithGravity(
          isWatchListMovie ? 'Removed from Watchlist' : 'Added to Watchlist',
        );

        // Refetch your list so the UI updates the icon
        WatchListMoviesRefetch();
      } catch (error) {
        console.error('Firestore Error: ', error);
        showToastWithGravity('Could not update watchlist');
      }
    });
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
      <StatusBar
        barStyle={`${isDark ? 'light-content' : 'dark-content'}`}
        className={`${isDark ? 'bg-black' : 'bg-white'}`}
      />
      <ScrollView
        className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: insets.top }}
      >
        <View className="w-full px-1.5 mt-2">
          <View className={`mb-5 overflow-hidden rounded-2xl`}>
            <ImageBackground
              source={{
                uri: PosterImage,
              }}
              style={{
                width: '100%',
                height: screenHeight * 0.3,
                justifyContent: 'flex-end',
              }}
              imageStyle={{ borderRadius: 16 }}
              className="rounded-2xl"
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(23,23,23,0.5)', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              />
            </ImageBackground>
          </View>
        </View>
        {/* Movie Info */}
        <View className="px-2">
          <Text
            numberOfLines={1}
            className={`text-xl text-center font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {MoviesDetails?.title}
          </Text>

          <View className="w-full flex-row items-center justify-center mt-5 gap-2 rounded-lg px-2">
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text
                className={`${
                  isDark ? 'text-white' : 'text-black'
                } text-[0.85rem]`}
              >
                {DateFormatter(MoviesDetails?.release_date)}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text
                className={`${
                  isDark ? 'text-white' : 'text-black'
                } text-[0.85rem]`}
              >
                {TimerFormatter(MoviesDetails?.runtime)}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text
                className={`text-[0.85rem] ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {MoviesDetails?.spoken_languages?.length > 2
                  ? MoviesDetails?.spoken_languages?.length + ' Languages'
                  : MoviesDetails?.spoken_languages
                      ?.map((info: { name: string }) => info?.name)
                      .join(', ')}
              </Text>
            </View>
            <Text
              className={`text-[0.85rem] ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              <Text className={'text-red-500'}>Adult : </Text>
              {MoviesDetails?.adult ? 'Yes' : 'No'}
            </Text>
          </View>

          <View className="w-full my-5">
            <Text
              className={`text-[0.85rem] text-center ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {MoviesDetails?.genres
                ?.map((g: { name: string }) => g.name)
                .join(' | ')}
            </Text>
          </View>

          <Text
            allowFontScaling={false}
            numberOfLines={8}
            className={`text-[0.84rem] leading-5 ${
              isDark ? 'text-neutral-300' : 'text-neutral-500'
            }`}
          >
            {MoviesDetails?.overview}
          </Text>

          <View className="w-full flex-row items-center justify-between px-4 my-8">
            <TouchableOpacity
              onPress={() => handleAddToWatchList(MoviesDetails)}
              className="flex items-center justify-center gap-1"
            >
              {isWatchListMovie ? (
                <Check color={isDark ? 'white' : 'black'} size={20} />
              ) : (
                <Plus color={isDark ? 'white' : 'black'} size={20} />
              )}
              <Text
                className={`${
                  isDark ? 'text-white' : 'text-black'
                } text-[0.7rem]`}
              >
                WatchList
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center gap-1">
              <Send color={isDark ? 'white' : 'black'} size={20} />
              <Text
                className={`${
                  isDark ? 'text-white' : 'text-black'
                } text-[0.7rem]`}
              >
                Share
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFavoriteToggle()}
              className={`flex items-center justify-center gap-1 }`}
            >
              <Heart
                color={`${
                  isFavoriteMovie ? 'red' : isDark ? 'white' : 'black'
                }`}
                size={20}
              />
              <Text
                className={`${
                  isDark ? 'text-white' : 'text-black'
                } text-[0.7rem]`}
              >
                Rate
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {Casts?.cast.length > 0 && <Cast Casts={Casts} loader={CastsLoading} />}

        <View>
          {SimilarMovies?.total_results > 0 && (
            <MovieList
              title="Similar Movies"
              MoviesApi={SimilarMovies}
              loader={SimilarMoviesLoading}
              isDark={isDark}
              hideSeeAll={true}
              actionType="push"
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsScreen;
