import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { Shadow } from 'react-native-shadow-2';
import MovieList from '../components/MovieList';
import { useGetCastDetailsQuery } from '../features/movies';
import { IMAGE_BASE_URL } from '@env';
import ProfileDetailsSkeleton from '../components/loaders/ProfileDetailsSkeleton';
const PersonScreen = ({ route, navigation }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // ------------------------------------------------------

  const { castId } = route.params;
  const { data: CastDetails, isLoading } = useGetCastDetailsQuery(castId);

  if (isLoading) return <ProfileDetailsSkeleton />;

  return (
    <ScrollView
      className="flex-1 bg-neutral-800"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
    >
      <View className="z-20 w-full flex-row items-center justify-between px-4 mt-2">
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

      {/* selected person */}

      <>
        <View className="flex-row justify-center mt-3">
          <Shadow
            distance={20}
            startColor="rgba(255,255,255,0.25)"
            endColor="rgba(255,255,255,0)"
            offset={[0, 0]}
            style={{
              borderRadius: 999,
              padding: 10,
            }}
          >
            <View className="w-[20rem] h-[20rem] border-2 border-neutral-400 rounded-full overflow-hidden">
              <Image
                source={{
                  uri: !!CastDetails?.profile_path
                    ? `${IMAGE_BASE_URL}${CastDetails?.profile_path}`
                    : 'https://static.vecteezy.com/system/resources/previews/030/504/837/large_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg',
                }}
                className="rounded-full w-full h-full"
              />
            </View>
          </Shadow>
        </View>
        <View className="flex-col justify-center mb-2">
          <View className="mt-8 px-16 mx-auto">
            <Text
              numberOfLines={1}
              className="text-2xl text-center font-bold text-white"
            >
              {CastDetails?.name}
            </Text>
            {CastDetails?.place_of_birth && (
              <Text className="text-white text-center my-3 text-xs flex-row mx-auto">
                {CastDetails?.place_of_birth}
              </Text>
            )}
            {CastDetails?.deathday && (
              <View className="my-3 flex-row items-center justify-center">
                <Text className="text-white my-1 text-xs ">Deathday : </Text>
                <Text className="text-neutral-300 mt-1 text-xs">
                  {CastDetails?.deathday}
                </Text>
              </View>
            )}
          </View>
          <View className="mx-2.5 p-4 flex-row justify-center bg-white/20 rounded-full mt-2">
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Gender
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                {CastDetails?.gender === 1
                  ? 'Female'
                  : CastDetails?.gender === 2
                  ? 'Male'
                  : 'Other'}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Birthday
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                {CastDetails?.birthday}
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Known for
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                {CastDetails?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Popularity
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                {CastDetails?.popularity}
              </Text>
            </View>
          </View>
          {CastDetails?.also_known_as.length > 0 && (
            <View className="mt-4 px-4">
              <Text className="text-white my-1 text-lg">Also Known As</Text>
              <Text className="text-neutral-300 text-xs">
                {CastDetails?.also_known_as.map(name => name).join(', ')}
              </Text>
            </View>
          )}
          {CastDetails?.biography && (
            <View className="mt-3 pl-3">
              <Text numberOfLines={12} className="text-neutral-300 text-xs">
                <Text className="text-white text-lg font-bold">
                  Biography :{' '}
                </Text>
                {CastDetails?.biography}
              </Text>
            </View>
          )}
        </View>
        {/* Person Movies */}
        {/* <MovieList title="Movies" hideSeeAll={true} MoviesApi={MoviesApi} /> */}
      </>
    </ScrollView>
  );
};

export default PersonScreen;
