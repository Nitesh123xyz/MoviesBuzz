import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { useGetAllTrendingMoviesQuery } from '../features/movies';
import { IMAGE_BASE_URL } from '@env';
import HomeSkeleton from './loaders/HomeSkeleton';
import Rating from './Rating';
const { width: screenWidth } = Dimensions.get('window');
const posterRatio = 1.5;
const carouselHeight = Math.round(screenWidth * posterRatio);

const ImageCarousel = () => {
  const { data, isLoading } = useGetAllTrendingMoviesQuery();
  const { results } = data || {};
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('MovieDetails', { movieId: item?.id });
  };

  if (isLoading) return <HomeSkeleton />;

  return (
    <>
      <View className="">
        <Text className="text-lg font-light ml-5 my-2 text-white">
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
            renderItem={({ item }) => (
              <MovieCard item={item} handleClick={handleClick} />
            )}
          />
        </View>
      </View>
    </>
  );
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={{ width: screenWidth, height: carouselHeight }}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
          className="w-full h-full rounded-2xl"
          resizeMode="cover"
        />
        <Rating RatingPer={item?.vote_average} Size={25} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageCarousel;
