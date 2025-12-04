import { Check, ChevronLeft, Heart, Plus, Send } from 'lucide-react-native';
import React, { useState } from 'react';
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
} from '../features/movies';
import MovieList from '../components/MovieList';
import { DateFormatter, TimerFormatter } from '../utils/Formatter';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { movieId } = route?.params;

  let PosterImage = '';
  // -----------------------------------------

  const { data: MoviesDetails, isLoading } = useGetMovieDetailsQuery(movieId);
  const { data: Casts, isLoading: CastsLoading } = useGetCastQuery(movieId);
  const { data: SimilarMovies, isLoading: SimilarMoviesLoading } =
    useGetSimilarMoviesQuery(movieId);
  // ----------------------------------------
  const { data: favData } = useGetFavoriteMoviesQuery();
  const results = favData?.results ?? [];
  const isFavoriteMovie = results?.some(movie => movie.id === movieId);
  const [isFavorite, setIsFavorite] = useState(isFavoriteMovie);
  const [isWatchList, setIsWatchList] = useState(false);

  // ----------------------------------------

  const [addFavoriteMovies] = useAddFavoriteMoviesMutation();

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
    // if (isFavorite) return;
    // const favData = {
    //   media_type: 'movie',
    //   media_id: movieId,
    //   favorite: !isFavoriteMovie,
    // };
    // const { data } = await addFavoriteMovies(favData);
    // console.log(data);
    // const { success } = data || {};
    // if (success) {
    //   setIsFavorite(!isFavorite);
    //   showToastWithGravity();
    // }
  };

  console.log(isFavoriteMovie);

  const handleFavoriteToggle = async () => {
    // if (isFavorite) return;

    const favData = {
      media_type: 'movie',
      media_id: movieId,
      favorite: isFavoriteMovie ? false : true,
    };
    const { data } = await addFavoriteMovies(favData);
    console.log(data);
    const { success, status_message } = data || {};
    if (success) {
      setIsFavorite(isFavoriteMovie ? false : true);
      showToastWithGravity(status_message);
    }
  };

  console.log(MoviesDetails);

  return (
    <>
      <ScrollView
        className="flex-1 bg-neutral-900"
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Back Button, Favorite, Poster */}
        <View className="w-full">
          {/* <View className="absolute z-20 w-full flex-row items-center justify-between px-4 mt-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex items-center justify-center bg-white/40 backdrop-blur-md w-10 h-10 rounded-full shadow-lg"
            >
              <ChevronLeft color={'white'} size={26} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAddToWatchList()}
              className="flex items-center justify-center bg-white/40 backdrop-blur-md w-10 h-10 rounded-full shadow-lg"
            >
              <Plus color={'white'} size={26} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFavoriteToggle()}
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
                isFavorite ? 'bg-red-500' : 'bg-white/40'
              }`}
            >
              <Heart color={'white'} size={26} />
            </TouchableOpacity>
          </View> */}

          {/* Poster with Gradient */}
          <View className="mb-20">
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
              {/* Black gradient overlay */}
              <LinearGradient
                colors={[
                  'rgba(23,23,23,1)',
                  'rgba(23,23,23,0.7)',
                  'rgba(23,23,23,0.5)',
                  'rgba(255,255,255,0.1)',
                  'transparent',
                ]}
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

          <View className="w-full flex-row items-center justify-center mt-3 gap-2 border border-gray-500 rounded-lg py-4">
            <View className="border-r-[1px] border-r-neutral-200 px-2 items-center">
              <Text className="text-white text-xs">
                {DateFormatter(MoviesDetails?.release_date)}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-200 px-2 items-center">
              <Text className="text-white text-xs">
                {TimerFormatter(MoviesDetails?.runtime)}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-200 px-2 items-center">
              <Text className="text-xs text-white">
                {MoviesDetails?.spoken_languages
                  ?.map(info => info?.name)
                  .join(', ')}
              </Text>
            </View>
            <Text className="text-xs text-neutral-200">
              <Text className="text-white">Adult : </Text>
              {MoviesDetails?.adult ? 'Yes' : 'No'}
            </Text>
          </View>

          <View className="w-full my-4">
            <Text className="text-xs text-center text-neutral-200">
              {MoviesDetails?.genres?.map(g => g.name).join(' | ')}
            </Text>
          </View>

          <Text numberOfLines={5} className="text-xs text-neutral-400">
            {MoviesDetails?.overview}
          </Text>

          <View className="w-full flex-row items-center justify-between px-4 my-5">
            <TouchableOpacity
              onPress={() => handleAddToWatchList()}
              className="flex items-center justify-center gap-1"
            >
              <Plus color={'white'} size={19} />
              {/* <Check color={'white'} size={19} /> */}
              <Text className="text-white text-[0.7rem]">WatchList</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex items-center justify-center gap-1"
            >
              <Send color={'white'} size={19} />
              <Text className="text-white text-[0.7rem]">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFavoriteToggle()}
              className={`flex items-center justify-center gap-1 ${
                isFavorite ? 'bg-red-500' : ''
              }`}
            >
              <Heart color={'white'} size={19} />
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
