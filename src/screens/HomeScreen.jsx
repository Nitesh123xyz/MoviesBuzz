import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import { Search, TextAlignStart } from 'lucide-react-native';
import ImageCarousel from '../components/ImageCarousel';
import MovieList from '../components/MovieList';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useGetLatestMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../features/movies';
const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { data: latest, isLoading: latestLoading } = useGetLatestMoviesQuery();
  const { data: upcoming, isLoading: upcomingLoading } =
    useGetUpcomingMoviesQuery();

  const toggleDrawer = useCallback(() => {
    navigation.getParent()?.dispatch(DrawerActions.toggleDrawer());
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" className="bg-neutral-800" />
      <View
        style={{ paddingTop: insets.top }}
        className="flex-1 bg-neutral-800"
      >
        <View className="px-1">
          <View className="flex-row items-center justify-between mx-3 py-1">
            <TouchableOpacity onPress={() => toggleDrawer()}>
              <TextAlignStart color="white" />
            </TouchableOpacity>
            <Text className="text-2xl text-white">GamesBuzz</Text>
            <Search
              onPress={() => navigation.navigate('Search')}
              color="white"
              className="bg-white"
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <ImageCarousel />

          <View className="mt-[-3rem]">
            <MovieList
              title="Upcoming"
              MoviesApi={upcoming}
              loader={upcomingLoading}
            />

            <MovieList
              title="Top Rated"
              MoviesApi={latest}
              loader={latestLoading}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
