import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { useGetAllGenresListQuery } from '../features/movies';

interface RenderItem {
  id: string | number;
  name: string;
}

const Genres = () => {
  const { data } = useGetAllGenresListQuery(1);
  const genres: RenderItem[] = data?.genres || [];

  return (
    <>
      <Text className="uppercase">Explore By Genres</Text>
      <View>
        <FlatList
          data={genres}
          horizontal={true}
          contentContainerStyle={{
            display: 'flex',
            gap: 5,
            borderRadius: 15,
            paddingHorizontal: 8,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View className={`flex-row gap-4 p-3 rounded-lg bg-red-500`}>
              <Text className="text-white">{item.name}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Genres;
