import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { IMAGE_BASE_URL } from '@env';
import { useGetWatchListMoviesQuery } from '../features/movies';
import { ArrowDownUp, ArrowUpDown } from 'lucide-react-native';
import { BackUpCastImage } from '../utils/Backup';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';

const { width: screenWidth } = Dimensions.get('window');
const COLUMNS = 3;
const GAP = 8;
const ITEM_WIDTH = Math?.floor((screenWidth - GAP * (COLUMNS + 1)) / COLUMNS);
const ITEM_HEIGHT = Math?.round(ITEM_WIDTH * 1.5);

const WatchListMovies = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const {
    data: favData,
    isLoading,
    isFetching,
    refetch,
  } = useGetWatchListMoviesQuery(sortOrder, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const results = favData?.results ?? [];

  const onRefresh = useCallback(async () => {
    try {
      await refetch();
    } catch (err) {
      console.warn('Refresh failed', err);
    }
  }, [refetch]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [refetch]),
  );

  const toggleSort = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('MovieDetails', { movieId: item?.id })
        }
        style={{ marginLeft: GAP, marginTop: GAP }}
      >
        <View style={{ width: ITEM_WIDTH }}>
          <View
            className="bg-neutral-800 rounded-lg justify-center items-center overflow-hidden"
            style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
          >
            {loading && (
              <ActivityIndicator
                size="small"
                color="white"
                className="absolute inset-0 z-40"
              />
            )}

            <FastImage
              source={{
                uri: !!item?.poster_path
                  ? `${IMAGE_BASE_URL}${item?.poster_path}`
                  : BackUpCastImage,
              }}
              style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
              resizeMode={FastImage?.resizeMode.cover}
              onProgress={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </View>

          <Text
            numberOfLines={2}
            className="text-white text-xs mt-1"
            style={{ width: ITEM_WIDTH }}
          >
            {item?.title ?? item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-neutral-900">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-row items-center justify-between p-3">
        <Text className="text-white text-[1.3rem]">Favorite</Text>

        <View className="flex-row items-center space-x-2">
          <TouchableOpacity
            onPress={toggleSort}
            className="bg-white/10 rounded-md p-2 ml-2"
            accessibilityLabel="Toggle sort"
          >
            {sortOrder === 'asc' ? (
              <ArrowDownUp color={'white'} />
            ) : (
              <ArrowUpDown color={'white'} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={results}
        numColumns={COLUMNS}
        keyExtractor={item => String(item?.id ?? Math.random())}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        decelerationRate={0.8}
        refreshing={isFetching}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default WatchListMovies;
