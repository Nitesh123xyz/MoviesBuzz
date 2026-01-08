import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { Shadow } from 'react-native-shadow-2';
import {
  useGetCastDetailsQuery,
  useGetCastRelatedMoviesQuery,
} from '../features/movies';
import { IMAGE_BASE_URL } from '@env';
import ProfileDetailsSkeleton from '../components/loaders/ProfileDetailsSkeleton';
import { DateFormatter } from '../utils/Formatter';
import MovieList from '../components/MovieList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/RootStackParamList';
import { useColorScheme } from 'nativewind';

// -------------------------------------------------------

type Props = NativeStackScreenProps<RootStackParamList, 'PersonScreen'>;

// -------------------------------------------------------

const PersonScreen = ({ route, navigation }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = {
    screenBg: isDark ? 'bg-black' : 'bg-white',
    overlayBg: isDark ? 'bg-white/20' : 'bg-black/20',
    cardBg: isDark ? 'bg-white/10' : 'bg-white',
    primaryText: isDark ? 'text-white' : 'text-black',
    secondaryText: isDark ? 'text-white' : 'text-black',
    border: isDark ? 'border-neutral-400' : 'border-neutral-500',
  };

  const { castId } = route.params;
  const { data: CastDetails, isLoading } = useGetCastDetailsQuery(castId);
  const { data: CastRelatedMovie, isLoading: CastRelatedMovieLoading } =
    useGetCastRelatedMoviesQuery(castId);

  if (isLoading) return <ProfileDetailsSkeleton />;

  return (
    <ScrollView
      className={`flex-1 ${theme.screenBg}`}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="z-20 w-full flex-row items-center justify-between px-4 mt-2">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${theme.overlayBg}`}
        >
          <ChevronLeft size={26} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
            isFavorite ? 'bg-red-500' : theme.overlayBg
          }`}
        >
          <Heart size={26} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View className="flex-row justify-center mt-3">
        <Shadow
          distance={20}
          startColor="rgba(255,255,255,0.25)"
          endColor="rgba(255,255,255,0)"
          offset={[0, 0]}
          style={{ borderRadius: 999, padding: 10 }}
        >
          <View
            className={`w-[20rem] h-[20rem] rounded-full overflow-hidden border-2 ${theme.border}`}
          >
            <Image
              source={{
                uri: CastDetails?.profile_path
                  ? `${IMAGE_BASE_URL}${CastDetails.profile_path}`
                  : 'https://static.vecteezy.com/system/resources/previews/030/504/837/large_2x/avatar-account-flat-isolated-on-transparent-background.jpg',
              }}
              className="w-full h-full rounded-full"
            />
          </View>
        </Shadow>
      </View>

      {/* Basic Info */}
      <View className="mt-8 px-16 mx-auto">
        <Text
          numberOfLines={1}
          className={`text-2xl text-center font-bold ${theme.primaryText}`}
        >
          {CastDetails?.name}
        </Text>

        {CastDetails?.place_of_birth && (
          <Text className={`text-xs text-center my-3 ${theme.secondaryText}`}>
            {CastDetails.place_of_birth}
          </Text>
        )}

        {CastDetails?.deathday && (
          <View className="flex-row justify-center my-2">
            <Text className={`${theme.primaryText} text-xs mr-1`}>
              Deathday:
            </Text>
            <Text className={`${theme.secondaryText} text-xs`}>
              {CastDetails.deathday}
            </Text>
          </View>
        )}
      </View>

      {/* Stats Card */}
      <View
        className={`mx-2.5 p-4 flex-row justify-center rounded-full border ${theme.border} mt-2`}
      >
        {[
          [
            'Gender',
            CastDetails?.gender === 1
              ? 'Female'
              : CastDetails?.gender === 2
              ? 'Male'
              : 'Other',
          ],
          ['Birthday', DateFormatter(CastDetails?.birthday)],
          ['Known for', CastDetails?.known_for_department],
          ['Popularity', CastDetails?.popularity],
        ].map(([label, value], index) => (
          <View
            key={label}
            className={`px-2 items-center ${
              index !== 3 ? `border-r ${theme.border}` : ''
            }`}
          >
            <Text className={`text-xs ${theme.primaryText}`}>{label}</Text>
            <Text className={`text-xs mt-1 ${theme.secondaryText}`}>
              {value}
            </Text>
          </View>
        ))}
      </View>

      {/* Also Known As */}
      {CastDetails?.also_known_as?.length > 0 && (
        <View className="mt-4 px-4">
          <Text className={`text-lg mb-1 ${theme.primaryText}`}>
            Also Known As
          </Text>
          <Text className={`text-xs ${theme.secondaryText}`}>
            {CastDetails.also_known_as.join(', ')}
          </Text>
        </View>
      )}

      {/* Biography */}
      {CastDetails?.biography && (
        <View className="mt-3 px-4">
          <Text className={`text-lg font-bold mb-1 ${theme.primaryText}`}>
            Biography
          </Text>
          <Text className={`text-xs leading-5 ${theme.secondaryText}`}>
            {CastDetails.biography}
          </Text>
        </View>
      )}

      {/* Movies */}
      <MovieList
        title="Movies"
        MoviesApi={CastRelatedMovie}
        loader={CastRelatedMovieLoading}
        hideSeeAll
      />
    </ScrollView>
  );
};

export default PersonScreen;
