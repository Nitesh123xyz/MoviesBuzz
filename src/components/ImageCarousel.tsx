import React from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useGetAllTrendingMoviesQuery } from '../features/movies';
import { IMAGE_BASE_URL } from '@env';
import HomeSkeleton from './loaders/HomeSkeleton';
import Rating from './Rating';
import { RootStackParamList } from 'src/types/RootStackParamList';

// ------------------------------------------------

interface MovieItem {
  id: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
}

interface MovieCardProps {
  item: MovieItem;
  handleClick: (item: { id: string }) => void;
}

interface TrendingMoviesResponse {
  results: MovieItem[];
}

// ------------------------------------------------

const { width: screenWidth } = Dimensions.get('window');
const posterRatio = 1.5;
const carouselHeight = Math.round(screenWidth * posterRatio);

const ImageCarousel = ({ isDark }: { isDark: boolean | string }) => {
  const { data, isLoading } = useGetAllTrendingMoviesQuery({});
  const { results } = (data as TrendingMoviesResponse) || {};
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleClick = (item: { id: string }) => {
    navigation.navigate('MovieDetails', { movieId: item?.id });
  };

  if (isLoading) return <HomeSkeleton />;

  return (
    <>
      <View>
        <Text
          className={`text-[1.3rem] ml-5 my-2 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          Trending
        </Text>
        <View className="items-center">
          <Carousel
            loop
            width={screenWidth}
            height={carouselHeight}
            data={results}
            defaultIndex={1}
            pagingEnabled
            mode="parallax"
            windowSize={3}
            containerStyle={{ marginTop: -50 }}
            modeConfig={{
              parallaxScrollingScale: 0.78,
            }}
            scrollAnimationDuration={500}
            renderItem={({ item }: { item: MovieItem }) => (
              <MovieCard item={item} handleClick={handleClick} />
            )}
          />
        </View>
      </View>
    </>
  );
};

const MovieCard = ({ item, handleClick }: MovieCardProps) => {
  const imageUri =
    item?.poster_path || item?.backdrop_path
      ? `${IMAGE_BASE_URL}${item?.poster_path}`
      : `${IMAGE_BASE_URL}${item?.backdrop_path}`;
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={{ width: screenWidth, height: carouselHeight }}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ width: '100%', height: '100%', borderRadius: 16 }}
          resizeMode="cover"
        />
        <Rating RatingPer={item?.vote_average} Size={27} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageCarousel;
