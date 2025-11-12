import { ChevronLeft, Heart } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import { IMAGE_BASE_URL } from '@env';
import { BackUpPosterImage } from '../utils/Backup';
import {
  useGetCastQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
} from '../features/movies';
import MainLoader from '../components/loaders/MainLoader';
import MovieList from '../components/MovieList';
import { DateFormatter } from '../utils/Formatter';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { movieId } = route?.params;
  const [isFavorite, setIsFavorite] = useState(false);
  let PosterImage = '';
  // -----------------------------------------

  const { data: MoviesDetails, isLoading } = useGetMovieDetailsQuery(movieId);
  const { data: Casts, isLoading: CastsLoading } = useGetCastQuery(movieId);
  const { data: SimilarMovies, isLoading: SimilarMoviesLoading } =
    useGetSimilarMoviesQuery(movieId);

  if (isLoading) {
    return <MainLoader />;
  }
  if (!!MoviesDetails?.backdrop_path) {
    PosterImage = `${IMAGE_BASE_URL}${MoviesDetails?.backdrop_path}`;
  } else if (!!MoviesDetails?.poster_path) {
    PosterImage = `${IMAGE_BASE_URL}${MoviesDetails?.poster_path}`;
  } else {
    PosterImage = BackUpPosterImage;
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-neutral-900"
        showsVerticalScrollIndicator={false}
      >
        {/* Header: Back Button, Favorite, Poster */}
        <View className="w-full">
          <View className="absolute z-20 w-full flex-row items-center justify-between px-4 mt-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex items-center justify-center bg-white/40 backdrop-blur-md w-10 h-10 rounded-full shadow-lg"
            >
              <ChevronLeft color={'white'} size={26} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
                isFavorite ? 'bg-red-500' : 'bg-white/40'
              }`}
            >
              <Heart color={'white'} size={26} />
            </TouchableOpacity>
          </View>

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
        <View className="px-4">
          <Text className="text-2xl font-bold text-white">
            {MoviesDetails?.title}
          </Text>

          <Text className="text-base text-neutral-400 my-1">
            <Text className="text-white">Adult : </Text>
            {MoviesDetails?.adult ? 'Yes' : 'No'}
          </Text>
          <Text className="text-base text-neutral-400 mb-1">
            <Text className="text-white">Original_language</Text> :{' '}
            {MoviesDetails?.original_language}
          </Text>
          <Text className="text-neutral-400">
            <Text className="text-white">Release : </Text>
            {DateFormatter(MoviesDetails?.release_date)}
          </Text>
          <Text className="text-neutral-400">
            <Text className="text-white">Runtime : </Text>
            {MoviesDetails?.runtime} min
          </Text>
          <View className="flex-row space-x-2 my-1">
            <Text className="text-white">Genres : </Text>
            <Text className="text-base text-neutral-400 text-wrap">
              {MoviesDetails?.genres?.map(info => info?.name).join(', ')}
            </Text>
          </View>
          <Text className="text-base text-neutral-400 my-1">
            <Text className="text-white">Status</Text> : {MoviesDetails?.status}
          </Text>
          <Text className="text-base text-neutral-400 my-1">
            <Text className="text-white">Revenue</Text> :{' '}
            {MoviesDetails?.revenue}
          </Text>
          <Text className="text-base text-neutral-400 my-1">
            <Text className="text-white">Languages</Text> :{' '}
            {MoviesDetails?.spoken_languages
              ?.map(info => info?.name)
              .join(', ')}
          </Text>
          <Text numberOfLines={8} className="text-base text-neutral-400 my-1">
            <Text className="text-white">Overview</Text> :{' '}
            {MoviesDetails?.overview}
          </Text>
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
