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
import MovieList from '../components/MovieList';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
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
          <View>
            <ImageBackground
              source={{ uri: movie.url }}
              style={{
                width: screenWidth,
                height: screenHeight * 0.55,
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

              <View className="px-4">
                <Text className="text-2xl font-bold text-white">
                  {movie.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Movie Info */}
        <View className="px-4 py-2">
          {/* <Text className="text-base text-neutral-400 mb-2">
            Source: {movie.source}
          </Text> */}
          <Text className="text-base text-neutral-400 mb-2">
            Release . 2020 . 170 min
          </Text>
          <Text className="text-base text-neutral-400 mb-2">
            Action . Thrill . Comedy
          </Text>
          <Text className="text-base leading-6 text-neutral-400">
            {movie.description}
          </Text>
        </View>

        {/* Cast Component Placeholder */}
        <Cast navigation={navigation} />

        {/* similar movies */}
        <MovieList
          title="Similar Movies"
          MoviesApi={MoviesApi}
          hideSeeAll={true}
        />
      </ScrollView>
    </>
  );
};

export default DetailsScreen;
