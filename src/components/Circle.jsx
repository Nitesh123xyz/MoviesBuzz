import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { IMAGE_BASE_URL } from '@env';
const Circle = ({ Information }) => {
  return (
    <>
      <Text className="text-white text-lg mx-4 mb-2">Top Cast</Text>
      <ScrollView
        data={Information}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 1, paddingBottom: 20 }}
        decelerationRate={0.8}
      >
        {Information?.map(item => (
          <View key={item.id}>
            <View className="flex-col items-center mx-2">
              <View className="border-2 border-gray-400 rounded-full p-0.5">
                <Image
                  source={{
                    uri: `${IMAGE_BASE_URL}${item?.logo_path}`,
                  }}
                  className="w-30 h-20 rounded-full"
                />
              </View>
              <Text
                numberOfLines={2}
                className="text-white text-center mt-2 text-xs w-16 truncate"
              >
                {item?.name}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Circle;
