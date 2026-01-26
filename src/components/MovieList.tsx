import React, { memo, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_BASE_URL } from '@env';
import Rating from './Rating';
import { BackUpPosterImage } from '../utils/Backup';
import { useColorScheme } from 'nativewind';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/RootStackParamList';

// ------------------------------------------------

interface MovieItem {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  title?: string;
  name?: string;
}

interface MovieListProps {
  title: string;
  MoviesApi: any;
  loader: boolean;
  isDark?: boolean;
  hideSeeAll?: boolean;
  actionType?: 'push' | 'navigate';
}

interface MovieCardProps {
  item: MovieItem;
  onPress: (id: number) => void;
}

// ------------------------------------------------
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
// ------------------------------------------------

const MovieCard = memo(function MovieCard({ item, onPress }: MovieCardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const imageUri =
    item?.poster_path || item?.backdrop_path
      ? `${IMAGE_BASE_URL}${item?.poster_path}`
      : `${IMAGE_BASE_URL}${item?.backdrop_path}`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item?.id)}
      style={{ marginHorizontal: 7.5 }}
    >
      <View style={{ width: screenWidth / 2 }}>
        <Image
          source={{
            uri: imageUri !== null ? imageUri : BackUpPosterImage,
          }}
          style={{
            width: screenWidth / 2,
            height: screenHeight / 2.9,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#111827',
            position: 'relative',
          }}
          resizeMode="cover"
        />

        <View pointerEvents="none">
          <Rating RatingPer={item?.vote_average} Size={18} />
        </View>

        <Text
          numberOfLines={1}
          style={{
            color: isDark ? 'white' : 'black',
            marginTop: 8,
            width: screenWidth / 2,
          }}
        >
          {item?.title || item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const MovieList = ({
  title,
  MoviesApi,
  loader,
  hideSeeAll = false,
  actionType = 'navigate',
}: MovieListProps) => {
  const { results, cast } = MoviesApi || {};
  const Results = results || cast || [];
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSeeAll = useCallback(() => {
    navigation.navigate('SeeAll', { title });
  }, [navigation, title]);

  const handlePressMovie = useCallback(
    (movieId: number) => {
      if (actionType === 'push') {
        navigation.push('DetailsScreen', { movieId });
      } else {
        navigation.navigate('DetailsScreen', { movieId });
      }
    },
    [navigation, actionType],
  );

  const renderMovieItem = useCallback(
    ({ item }: { item: MovieItem }) => (
      <MovieCard item={item} onPress={handlePressMovie} />
    ),
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
        <Text className={`${isDark ? 'text-white' : 'text-black'} text-lg`}>
          {title}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity
            className={`${
              isDark ? 'bg-white/20' : 'bg-black/20'
            } p-2 rounded-md`}
            onPress={handleSeeAll}
          >
            <Text style={{ color: isDark ? 'white' : 'black', fontSize: 10 }}>
              See All
            </Text>
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
