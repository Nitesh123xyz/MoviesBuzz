import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  useGetGenreMoviesQuery,
  useGetLatestMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../features/movies';
import { LayoutGrid, LayoutList } from 'lucide-react-native';
import { IMAGE_BASE_URL } from '@env';
import { DateFormatter } from '../utils/Formatter';
import { BackUpPosterImage } from '../utils/Backup';
import { RootStackParamList } from '../types/RootStackParamList';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Rating from '../components/Rating';
import { useColorScheme } from 'nativewind';

const LAYOUTS = {
  LIST: 'LIST',
  GRID3: 'GRID3',
};

type Props = NativeStackScreenProps<RootStackParamList, 'SeeAll'>;
interface MovieItem {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  [key: string]: any;
}

const SeeAll = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { title, genreId, genreName } = route?.params;
  const [pageNo, setPageNo] = useState(1);
  const [items, setItems] = useState<MovieItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [layout, setLayout] = useState(LAYOUTS.GRID3);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    data: latestData,
    isFetching: isFetchingLatest,
    isLoading: isLoadingLatest,
    isError: isErrorLatest,
  } = useGetLatestMoviesQuery(pageNo, { skip: title !== 'Top Rated' });

  const {
    data: GenresData,
    isFetching: isFetchingGenres,
    isLoading: isLoadingGenres,
    isError: isErrorGenres,
  } = useGetGenreMoviesQuery({ page: pageNo, genreId }, { skip: !genreId });

  const {
    data: upcomingData,
    isFetching: isFetchingUpcoming,
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
  } = useGetUpcomingMoviesQuery(pageNo, { skip: title !== 'Upcoming' });

  let activeData: any;
  let activeFetching: boolean = false;
  let activeLoading: boolean = false;
  let activeError: any;

  if (genreId) {
    activeData = GenresData;
    activeFetching = isFetchingGenres;
    activeLoading = isLoadingGenres;
    activeError = isErrorGenres;
  } else if (title === 'Top Rated') {
    activeData = latestData;
    activeFetching = isFetchingLatest;
    activeLoading = isLoadingLatest;
    activeError = isErrorLatest;
  } else if (title === 'Upcoming') {
    activeData = upcomingData;
    activeFetching = isFetchingUpcoming;
    activeLoading = isLoadingUpcoming;
    activeError = isErrorUpcoming;
  }

  // ---------------------------------------------------------------

  const theme = {
    backgroundColor: isDark ? 'bg-black' : 'bg-white',
    textColor: isDark ? 'text-white' : 'text-black',
    secondaryText: isDark ? 'text-neutral-400' : 'text-neutral-600',
    borderLine: isDark ? 'border-neutral-800' : 'border-neutral-200',
    renderListColor: isDark ? 'bg-white/40' : 'bg-black/10',
    renderGridColor: isDark ? 'bg-white/40' : 'bg-black/10',
  };

  // ---------------------------------------------------------------

  useEffect(() => {
    if (!activeData) return;

    const newResults = Array.isArray(activeData.results)
      ? activeData.results
      : [];
    setTotalPages(activeData.total_pages ?? activeData.totalPages ?? 1);

    setItems(prev => {
      if (pageNo === 1) return newResults;
      const existingIds = new Set(
        prev.map((i: { id: string | number }) => i.id),
      );
      const filtered = newResults.filter(
        (i: { id: string | number }) => !existingIds.has(i.id),
      );
      return prev.concat(filtered);
    });
  }, [activeData, pageNo, title]);

  const handleLoadMore = () => {
    if (activeFetching) return;
    if (pageNo >= (totalPages || 1)) return;
    setPageNo(prev => prev + 1);
  };

  const shuffle = (arr: MovieItem[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const refreshList = () => {
    setPageNo(1);
    setItems(prev => {
      const copy = [...prev];
      return shuffle(copy);
    });
  };

  // ---------------------------------------------------------------

  const keyExtractor = (item: { id: string | number }) =>
    String(item.id ?? Math.random());

  const numColumns =
    layout === LAYOUTS.LIST ? 1 : layout === LAYOUTS.GRID3 ? 3 : 3;

  // Renderers
  const renderListItem = ({ item }: { item: MovieItem }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', { movieId: item.id })}
      className={`px-4 py-3 border-b ${theme.borderLine} flex-row items-start ${theme.backgroundColor}`}
    >
      <View>
        <Image
          source={{
            uri: item.poster_path
              ? `${IMAGE_BASE_URL}${item.poster_path}`
              : BackUpPosterImage,
          }}
          style={{
            width: 100,
            height: 140,
            borderRadius: 8,
            position: 'relative',
          }}
          resizeMode="cover"
        />
        <Rating RatingNumber={item?.vote_average ?? 0} />
      </View>
      <View className="ml-3 flex-1">
        <Text
          numberOfLines={1}
          className={`${theme.textColor} text-base font-semibold`}
        >
          {item?.title ?? 'Untitled'}
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          {DateFormatter(item?.release_date) ?? ''}
        </Text>
        <Text
          numberOfLines={5}
          className={`${theme.secondaryText} text-xs font-semibold mt-2`}
        >
          {item?.overview ?? item?.name ?? 'Untitled'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderGridItem = ({ item }: { item: MovieItem }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsScreen', { movieId: item.id })
        }
        className={`m-2 ${theme.backgroundColor} ${
          numColumns === 3 ? 'flex-1' : ''
        }`}
        style={numColumns === 3 ? { maxWidth: '31%' } : undefined}
      >
        <Image
          source={{
            uri: item.poster_path
              ? `${IMAGE_BASE_URL}${item.poster_path}`
              : BackUpPosterImage,
          }}
          style={{
            width: '100%',
            height: numColumns === 3 ? 140 : 200,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />

        <Rating RatingNumber={item?.vote_average ?? 0} />

        <View className="mt-2 px-1">
          <Text
            className={`${theme.textColor} text-sm font-semibold`}
            numberOfLines={2}
          >
            {item?.title ?? item?.name ?? 'Untitled'}
          </Text>
          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-gray-400 text-xs">
              {item?.release_date?.slice?.(0, 4) ?? ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooter = () => {
    if (!activeFetching) return null;
    return (
      <View className="my-20 items-center">
        <ActivityIndicator size={30} color="red" />
        <Text className="text-gray-400 text-xs mt-2">Loading more...</Text>
      </View>
    );
  };

  if (activeLoading && pageNo === 1 && items.length === 0) {
    return (
      <View
        className={`${theme.backgroundColor} flex-1 items-center justify-center`}
      >
        <ActivityIndicator size={30} color="red" />
        <Text className="text-gray-400 mt-3">Loading...</Text>
      </View>
    );
  }

  if (activeError && items.length === 0) {
    return (
      <View
        className={`${theme.backgroundColor} flex-1 items-center justify-center px-6`}
      >
        <Text className={`${theme.textColor} mb-4`}>
          Failed to load movies.
        </Text>
        <Pressable
          onPress={refreshList}
          className="bg-indigo-500 px-4 py-2 rounded"
        >
          <Text className={`${theme.textColor} font-medium`}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View
        className={`px-2 py-3 border-b ${theme.backgroundColor} ${theme.borderLine} flex-row items-center justify-between`}
      >
        <Text className={`${theme.textColor} text-2xl font-bold uppercase`}>
          {title || genreName}
        </Text>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setLayout(LAYOUTS.LIST)}
            className={`p-3 rounded ${
              layout === LAYOUTS.LIST && theme.renderListColor
            }`}
          >
            <LayoutList color={isDark ? 'white' : 'black'} size={16} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setLayout(LAYOUTS.GRID3)}
            className={`p-3 rounded ${
              layout === LAYOUTS.GRID3 && theme.renderGridColor
            }`}
          >
            <LayoutGrid color={isDark ? 'white' : 'black'} size={16} />
          </TouchableOpacity>
        </View>
      </View>

      <View className={`flex-1 mb-16 relative ${theme.backgroundColor}`}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={layout === LAYOUTS.LIST ? renderListItem : renderGridItem}
          style={{ flex: 1 }}
          contentContainerStyle={items.length === 0 ? { flex: 1 } : {}}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          decelerationRate={0.8}
          ListFooterComponent={ListFooter}
          numColumns={numColumns}
          key={numColumns}
          refreshing={activeFetching && pageNo === 1}
          onRefresh={refreshList}
        />
      </View>
    </View>
  );
};

export default SeeAll;
