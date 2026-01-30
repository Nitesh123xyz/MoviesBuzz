import React, { memo, useCallback } from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGE_BASE_URL } from '@env';
import { BackUpPosterImage } from '../utils/Backup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/RootStackParamList';
import { ChevronRight } from 'lucide-react-native';
import Rating from './Rating';

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
  isDark: boolean | string | number;
  hideSeeAll?: boolean;
  actionType?: 'push' | 'navigate';
}

interface MovieCardProps {
  item: MovieItem;
  isDark: boolean | string | number;
  onPress: (id: number) => void;
}

// ------------------------------------------------
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
// ------------------------------------------------

const MovieCard = memo(function MovieCard({
  item,
  isDark,
  onPress,
}: MovieCardProps) {
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
      <View style={{ width: screenWidth / 3.1 }}>
        <Image
          source={{
            uri: imageUri !== null ? imageUri : BackUpPosterImage,
          }}
          style={{
            width: screenWidth / 3.1,
            height: screenHeight / 4.5,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#111827',
            // position: 'relative',
          }}
          resizeMode="cover"
        />

        <Rating RatingNumber={item?.vote_average ?? 0} />

        <Text
          numberOfLines={1}
          className="text-xs"
          style={{
            color: isDark ? 'white' : 'black',
            marginTop: 8,
            width: screenWidth / 2,
          }}
        >
          {item?.title?.slice(0, 15) || item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const MovieList = ({
  title,
  MoviesApi,
  isDark,
  hideSeeAll = false,
  actionType = 'navigate',
}: MovieListProps) => {
  const { results, cast } = MoviesApi || {};
  const Results = results || cast || [];
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
      <MovieCard item={item} isDark={isDark} onPress={handlePressMovie} />
    ),
    [handlePressMovie],
  );

  return (
    <View style={{ marginVertical: 8 }}>
      <View
        style={{
          paddingHorizontal: 9,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          className={`${
            isDark ? 'text-white' : 'text-black'
          } text-lg uppercase`}
        >
          {title}
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity
            className={`${
              isDark ? 'bg-white/20' : 'bg-black/10'
            } p-1.5 rounded-full`}
            onPress={handleSeeAll}
          >
            <ChevronRight color={isDark ? 'white' : 'black'} size={15} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={Results}
        keyExtractor={(item, idx) => (item?.id ? String(item.id) : String(idx))}
        renderItem={renderMovieItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={screenWidth / 2 + 16}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default memo(MovieList);
