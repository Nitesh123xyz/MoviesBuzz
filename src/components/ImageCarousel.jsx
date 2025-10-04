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

const { width: screenWidth } = Dimensions.get('window');
const posterRatio = 1.5;
const carouselHeight = Math.round(screenWidth * posterRatio);

const ImageCarousel = ({ MoviesApi }) => {
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('MovieDetails', { movie: item });
  };

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
            data={MoviesApi}
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
          source={{ uri: item.url }}
          className="w-full h-full rounded-2xl"
          resizeMode="cover"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageCarousel;
