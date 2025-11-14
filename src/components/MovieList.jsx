import React, { memo, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { IMAGE_BASE_URL } from '@env';
import Rating from './Rating';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MovieCard = memo(function MovieCard({ item, onPress }) {
  const imageUri = `${IMAGE_BASE_URL}${
    item?.poster_path || item?.backdrop_path
  }`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item?.id)}
      style={{ marginHorizontal: 7.5 }}
    >
      <View style={{ width: screenWidth / 2 }}>
        <FastImage
          source={{
            uri: imageUri,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={{
            width: screenWidth / 2,
            height: screenHeight / 2.9,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#111827',
            position: 'relative',
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View pointerEvents="none">
          <Rating RatingPer={item?.vote_average} Size={15} />
        </View>

        <Text
          numberOfLines={1}
          style={{ color: '#cbd5e1', marginTop: 8, width: screenWidth / 2 }}
        >
          {item?.title || item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const MovieList = ({ title, MoviesApi, loader, hideSeeAll = false }) => {
  const { results, cast } = MoviesApi || {};
  const Results = results || cast || [];
  const navigation = useNavigation();

  const handleSeeAll = useCallback(() => {
    navigation.navigate('SeeAll', { title });
  }, [navigation, title]);

  const handlePressMovie = useCallback(
    movieId => {
      navigation.push('MovieDetails', { movieId });
    },
    [navigation],
  );

  const renderMovieItem = useCallback(
    ({ item }) => <MovieCard item={item} onPress={handlePressMovie} />,
    [handlePressMovie],
  );

  if (loader) {
    return (
      <ActivityIndicator
        size="large"
        color="white"
        style={{ marginVertical: 20 }}
      />
    );
  }

  return (
    <View style={{ marginVertical: 8 }}>
      <View
        style={{
          marginHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={{ color: '#9CA3AF', fontSize: 16 }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={Results}
        keyExtractor={(item, idx) => (item?.id ? String(item.id) : String(idx))}
        renderItem={renderMovieItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={screenWidth / 2 + 16}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default memo(MovieList);
