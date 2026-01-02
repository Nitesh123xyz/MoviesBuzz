import { ScrollView, StatusBar, Text, View } from 'react-native';
import React from 'react';
import { Search } from 'lucide-react-native';
import ImageCarousel from '../components/ImageCarousel';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useGetLatestMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../features/movies';
import { useColorScheme } from 'nativewind';
const HomeScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { data: latest, isLoading: latestLoading } = useGetLatestMoviesQuery();
  const { data: upcoming, isLoading: upcomingLoading } =
    useGetUpcomingMoviesQuery();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        className={`${isDark ? 'bg-neutral-800' : 'bg-white'}`}
      />
      <View
        style={{ paddingTop: insets.top }}
        className={`flex-1 ${isDark ? 'bg-neutral-800' : 'bg-white'}`}
      >
        <View className="px-1">
          <View className="flex-row items-center justify-between mx-3 py-1">
            <Text
              className={`text-2xl ${isDark ? 'text-white' : 'text-black'}`}
            >
              GamesBuzz
            </Text>
            <Search
              onPress={() => navigation.navigate('Search')}
              color={`${isDark ? 'white' : 'black'}`}
              // className={`${isDark ? 'bg-white' : 'bg-black'} p-1`}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <ImageCarousel isDark={isDark} />

          <View className="mt-[-3rem]">
            <MovieList
              title="Upcoming"
              MoviesApi={upcoming}
              loader={upcomingLoading}
              isDark={isDark}
            />

            <MovieList
              title="Top Rated"
              MoviesApi={latest}
              loader={latestLoading}
              isDark={isDark}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
