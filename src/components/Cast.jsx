import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { IMAGE_BASE_URL } from '@env';
import { BackUpCastImage } from '../utils/Backup';
// import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from '@d11/react-native-fast-image';
const Cast = ({ navigation, Casts, loader }) => {
  const { cast: castMembers } = Casts || {};
  const [imageLoading, setImageLoading] = useState(false);

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

  const startProgress = useCallback(() => {
    setImageLoading(true);
  }, []);

  const endLoad = useCallback(() => {
    setImageLoading(false);
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Person', { castId: item?.id })}
    >
      <View className="flex-col items-center mx-2">
        <View className="border-2 border-gray-400 rounded-full p-0.5">
          <FastImage
            source={{
              uri: !!item?.profile_path
                ? `${IMAGE_BASE_URL}${item?.profile_path}`
                : BackUpCastImage,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{ width: 70, height: 70, borderRadius: 50 }}
            resizeMode={FastImage.resizeMode.cover}
            onProgress={startProgress}
            onLoadEnd={endLoad}
          />
          {imageLoading && (
            <ActivityIndicator
              size="small"
              color="white"
              style={{ position: 'absolute', inset: 0 }}
            />
          )}
        </View>

        <Text
          numberOfLines={2}
          className="text-white text-center mt-2 text-xs w-16 truncate"
        >
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Text className="text-white text-lg mx-4 mb-2">Top Cast</Text>
      <FlatList
        data={castMembers}
        keyExtractor={item => item?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 1, paddingBottom: 20 }}
        decelerationRate={0.8}
      />
    </>
  );
};

export default Cast;
