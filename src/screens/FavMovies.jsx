import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMAGE_BASE_URL } from '@env';
import { useGetFavoriteMoviesQuery } from '../features/movies';
import { ArrowUpDown } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');
const COLUMNS = 3;
const GAP = 8;
const ITEM_WIDTH = Math.floor((screenWidth - GAP * (COLUMNS + 1)) / COLUMNS);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1.5);

const FavMovies = ({ navigation }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const { data: favData, isLoading } = useGetFavoriteMoviesQuery(sortOrder);
  const results = favData?.results ?? [];
  const [loading, setLoading] = useState(true);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-neutral-900">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation?.navigate('MovieDetails', { id: item?.id })}
        style={{ marginLeft: GAP, marginTop: GAP }}
      >
        <View style={{ width: ITEM_WIDTH }}>
          <View
            className="bg-neutral-800 rounded-lg justify-center items-center overflow-hidden"
            style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
          >
            {loading && <ActivityIndicator size="small" color="white" />}

            <FastImage
              source={{
                uri: `${IMAGE_BASE_URL}${item?.poster_path}`,
              }}
              style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
              resizeMode={FastImage.resizeMode.cover}
              onLoadStart={() => setLoading(true)}
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

  return (
    <View className="flex-1 bg-neutral-900">
      <Text className="text-white text-center p-3 text-[1.3rem]">Favorite</Text>

      <TouchableOpacity
          onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="absolute top-5 left-4 z-10 bg-white/30 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center"
        >
          <ArrowUpDown />
        </TouchableOpacity>
      <FlatList
        data={results}
        numColumns={COLUMNS}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          paddingLeft: GAP,
          paddingTop: GAP,
        }}
      />
    </View>
  );
};

export default FavMovies;
