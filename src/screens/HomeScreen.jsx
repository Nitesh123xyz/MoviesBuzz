import { ScrollView, StatusBar, Text, View } from 'react-native';
import React from 'react';
import { Search, TextAlignStart } from 'lucide-react-native';
import ImageCarousel from '../components/ImageCarousel';
import MovieList from '../components/MovieList';
import MoviesApi from '../utils/dummy';
const HomeScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" className="bg-neutral-800" />
      <View className="flex-1 bg-neutral-800">
        <View className="px-1">
          <View className="flex-row items-center justify-between mx-3 py-1">
            <TextAlignStart color="white" className="bg-white" />
            <Text className="text-2xl text-white">GamesBuzz</Text>
            <Search color="white" className="bg-white" />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Trending Carousel */}
          <ImageCarousel MoviesApi={MoviesApi} />
          <View className="mt-[-3rem]">
            {/* Upcoming Carousel */}
            <MovieList title="Upcoming" MoviesApi={MoviesApi} />
            {/* Latest Carousel */}
            <MovieList title="Latest" MoviesApi={MoviesApi} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
