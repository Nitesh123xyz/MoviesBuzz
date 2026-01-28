import { ScrollView, StatusBar, View } from 'react-native';
import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import { useColorScheme } from 'nativewind';
import { useGetAllTrendingTVShowsQuery } from '../features/movies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ------------------------------------------------

interface MovieItem {
  id: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
}

interface TrendingMoviesResponse {
  results: MovieItem[];
}

// ------------------------------------------------

const TvScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const { data, isLoading } = useGetAllTrendingTVShowsQuery(1);
  const { results } = (data as TrendingMoviesResponse) || {};

  return (
    <>
      <StatusBar
        barStyle={`${isDark ? 'light-content' : 'dark-content'}`}
        className={`${isDark ? 'bg-black' : 'bg-white'}`}
      />
      <View
        style={{ paddingTop: insets.top }}
        className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'} mb-5`}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageCarousel results={results} isLoading={isLoading} />

          <View className="mt-[-6rem]">
            {/* <MovieList
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
            /> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TvScreen;
