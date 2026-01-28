import React from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IMAGE_BASE_URL } from '@env';
import Rating from './Rating';
import { RootStackParamList } from 'src/types/RootStackParamList';
import IndicatorLoader from '../components/loaders/IndicatorLoader';
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

interface ImageCarouselProps {
  results: MovieItem[];
  loading?: boolean;
}

// ------------------------------------------------

const { width: screenWidth } = Dimensions.get('window');
const posterRatio = 1.5;
const carouselHeight = Math.round(screenWidth * posterRatio);

const ImageCarousel = ({ results, loading }: ImageCarouselProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleClick = (item: { id: string }) => {
    navigation.navigate('DetailsScreen', { movieId: item?.id });
  };

  if (loading) {
    return (
      <>
        <IndicatorLoader Size={30} Color="red" />
      </>
    );
  }

  return (
    <>
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
          style={{ width: '100%', height: '90%', borderRadius: 16 }}
          resizeMode="stretch"
        />
        <Rating RatingPer={item?.vote_average} Size={27} BottomPosition={60} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageCarousel;
