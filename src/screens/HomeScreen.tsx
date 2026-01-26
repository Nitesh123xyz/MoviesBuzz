import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import MovieList from '../components/MovieList';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useGetLatestMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../features/movies';
import { useColorScheme } from 'nativewind';
import { RootStackParamList } from 'src/types/RootStackParamList';

const HomeScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const { data: latest, isLoading: latestLoading } = useGetLatestMoviesQuery(1);
  const { data: upcoming, isLoading: upcomingLoading } =
    useGetUpcomingMoviesQuery(1);

  return (
    <>
      <StatusBar
        barStyle={`${isDark ? 'light-content' : 'dark-content'}`}
        className={`${isDark ? 'bg-black' : 'bg-white'}`}
      />
      <View
        style={{ paddingTop: insets.top }}
        className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
      >
        <View className="px-1">
          <View className="flex-row items-center justify-between mx-3 py-1">
            <Text
              className={`text-3xl ${isDark ? 'text-white' : 'text-black'}`}
            >
              Movies Buzz
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              className={`${
                isDark ? 'bg-white/20' : 'bg-black/10'
              } p-2.5 rounded-lg`}
            >
              <Text className={`${isDark ? 'text-white' : 'text-black'}`}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
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
