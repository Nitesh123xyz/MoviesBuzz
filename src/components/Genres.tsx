import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useGetAllGenresListQuery } from '../features/movies';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/RootStackParamList';

interface RenderItem {
  id: string | number;
  name: string;
}

interface GenresProps {
  isDark: boolean;
}

const Genres = ({ isDark }: GenresProps) => {
  const { data } = useGetAllGenresListQuery(1);
  const genres: RenderItem[] = data?.genres || [];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const colorPalette = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-red-500',
    'bg-amber-500',
    'bg-violet-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-orange-500',
  ];

  return (
    <>
      <Text
        className={`uppercase ml-2.5 mb-4 text-lg ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        Explore By Genres
      </Text>
      <View>
        <FlatList
          data={genres}
          horizontal={true}
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 8,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => {
            const colorClass = colorPalette[index % colorPalette.length];
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('SeeAll', {
                    genreId: item.id,
                    genreName: item?.name,
                  })
                }
              >
                <View
                  className={`p-3.5 px-5 rounded-md ${colorClass} shadow-sm`}
                >
                  <Text className="text-white font-semibold text-md">
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export default Genres;
