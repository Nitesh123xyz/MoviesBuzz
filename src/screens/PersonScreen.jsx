import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { Shadow } from 'react-native-shadow-2';
import MovieList from '../components/MovieList';

const PersonScreen = ({ route, navigation }) => {
  const { actor } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
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
        <View className="flex-row justify-center mt-5">
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
                source={{ uri: actor.imageUrl }}
                className="rounded-full w-full h-full"
              />
            </View>
          </Shadow>
        </View>
        <View className="flex-col justify-center mb-2">
          <View className="mt-6 px-16 mx-auto">
            <Text
              numberOfLines={2}
              className="text-2xl text-center font-bold text-white"
            >
              {actor.name}
            </Text>
            <Text className="text-white text-center mt-2 text-xs flex-row mx-auto">
              London, United Kingdom
            </Text>
          </View>
          <View className="mx-2.5 p-4 flex-row justify-center bg-white/20 rounded-full mt-6">
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Gender
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                Female
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Birthday
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                1946-11-30
              </Text>
            </View>
            <View className="border-r-[1px] border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Known for
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                Acting
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white text-center mt-1 text-xs">
                Popularity
              </Text>
              <Text className="text-neutral-300 text-center mt-1 text-xs">
                64.123
              </Text>
            </View>
          </View>
          <View className="mt-4 px-4">
            <Text className="text-white my-1 text-lg">Biography</Text>
            <Text className="text-neutral-300 mt-1 text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              soluta sed iste iusto ab nesciunt, magnam assumenda voluptas!
              Porro repellat sapiente culpa? Earum, quasi reprehenderit!
              Quisquam voluptates, voluptatem nemo mollitia quasi minus
              laudantium doloribus iure? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum soluta sed iste iusto ab nesciunt, magnam
              assumenda voluptas! Porro repellat sapiente culpa? Earum, quasi
              reprehenderit! Quisquam voluptates, voluptatem nemo mollitia quasi
              minus laudantium doloribus iure?
            </Text>
          </View>
        </View>
        {/* Person Movies */}
        <MovieList title="Movies" hideSeeAll={true} MoviesApi={MoviesApi} />
      </>
    </ScrollView>
  );
};

export default PersonScreen;
