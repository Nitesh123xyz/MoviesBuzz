import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IMAGE_BASE_URL } from '@env';
const Cast = ({ navigation, Casts, loader }) => {
  const { cast: castMembers } = Casts || {};

  if (loader) {
    return (
      <>
        <ActivityIndicator
          size="large"
          color="white"
          style={{ marginVertical: 20 }}
        />
      </>
    );
  }

  return (
    <>
      <Text className="text-white text-lg mx-4 mb-2">Top Cast</Text>
      <ScrollView
        data={castMembers}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 1, paddingBottom: 20 }}
        decelerationRate={0.8}
      >
        {castMembers?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('Person', { castId: item.id })}
          >
            <View className="flex-col items-center mx-2">
              <View className="border-2 border-gray-400 rounded-full p-0.5">
                <Image
                  source={{
                    uri: !!item?.profile_path
                      ? `${IMAGE_BASE_URL}${item?.profile_path}`
                      : 'https://static.vecteezy.com/system/resources/previews/030/504/837/large_2x/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg',
                  }}
                  className="w-20 h-20 rounded-full"
                />
              </View>
              <Text
                numberOfLines={2}
                className="text-white text-center mt-2 text-xs w-16 truncate"
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default Cast;
