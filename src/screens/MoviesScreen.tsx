import React from 'react';
import { useColorScheme } from 'nativewind';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageCarousel from '../components/ImageCarousel';
import {
  useGetAllTrendingMoviesQuery,
  useGetLatestMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../features/movies';
import MovieList from '../components/MovieList';
import { FlatList } from 'react-native';
import Genres from '../components/Genres';
import IndicatorLoader from '../components/loaders/IndicatorLoader';

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

const MoviesScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const { data, isLoading: TrendingLoading } = useGetAllTrendingMoviesQuery(1);
  const { results } = (data as TrendingMoviesResponse) || {};

  const { data: upcoming, isLoading: upcomingLoading } =
    useGetUpcomingMoviesQuery(1);
  const { data: latest, isLoading: latestLoading } = useGetLatestMoviesQuery(1);

  return (
    <>
      <StatusBar
        barStyle={`${isDark ? 'light-content' : 'dark-content'}`}
        className={`${isDark ? 'bg-black' : 'bg-white'}`}
      />
      <View
        style={{ paddingTop: insets.top }}
        className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'} mb-16`}
      >
        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              {TrendingLoading ? (
                <IndicatorLoader size={30} color="red" />
              ) : (
                <ImageCarousel results={results} />
              )}
              <View className="mt-[-6rem]">
                <Genres isDark={isDark} />

                <View className="mt-[0.5rem]">
                  {upcomingLoading ? (
                    <IndicatorLoader size={30} color="red" />
                  ) : (
                    <MovieList
                      title="Upcoming"
                      MoviesApi={upcoming}
                      isDark={isDark}
                    />
                  )}
                  {latestLoading ? (
                    <IndicatorLoader size={30} color="red" />
                  ) : (
                    <MovieList
                      title="Top Rated"
                      MoviesApi={latest}
                      isDark={isDark}
                    />
                  )}
                </View>
              </View>
            </>
          }
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={3}
          windowSize={5}
        />
      </View>
    </>
  );
};

export default MoviesScreen;
