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
  useGetLatestMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '../features/movies';
import { LayoutGrid, LayoutList } from 'lucide-react-native';
import { IMAGE_BASE_URL } from '@env';
import { DateFormatter } from '../utils/Formatter';
import { BackUpPosterImage } from '../utils/Backup';
import { RootStackParamList } from 'src/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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

const SeeAll = ({ route, navigation }: Props) => {
  const { title } = route?.params;
  const [pageNo, setPageNo] = useState(1);
  const [items, setItems] = useState<MovieItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [layout, setLayout] = useState(LAYOUTS.GRID3);

  // Hooks called unconditionally
  const {
    data: latestData,
    isFetching: isFetchingLatest,
    isLoading: isLoadingLatest,
    isError: isErrorLatest,
  } = useGetLatestMoviesQuery(pageNo, { skip: title !== 'Top Rated' });

  const {
    data: upcomingData,
    isFetching: isFetchingUpcoming,
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
  } = useGetUpcomingMoviesQuery(pageNo, { skip: title !== 'Upcoming' });

  const activeData = title === 'Top Rated' ? latestData : upcomingData;
  const activeFetching =
    title === 'Top Rated' ? isFetchingLatest : isFetchingUpcoming;
  const activeLoading =
    title === 'Top Rated' ? isLoadingLatest : isLoadingUpcoming;
  const activeError = title === 'Top Rated' ? isErrorLatest : isErrorUpcoming;

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

  const keyExtractor = (item: { id: string | number }) =>
    String(item.id ?? Math.random());

  const numColumns =
    layout === LAYOUTS.LIST ? 1 : layout === LAYOUTS.GRID3 ? 3 : 3;

  // Renderers
  const renderListItem = ({ item }: { item: MovieItem }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
      className="px-4 py-3 border-b border-gray-700 flex-row items-center bg-black"
    >
      <Image
        source={{
          uri: item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : BackUpPosterImage,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
          backgroundColor: '#111827',
        }}
        resizeMode="cover"
      />
      <View className="ml-3 flex-1">
        <Text className="text-white text-base font-semibold">
          {item?.title ?? item?.name ?? 'Untitled'}
        </Text>
        <Text className="text-gray-400 text-xs mt-1">
          {DateFormatter(item?.release_date) ?? ''}
        </Text>
        <View className="mt-2 inline-flex flex-row items-center">
          <View className="px-2 py-1 bg-yellow-500 rounded-full">
            <Text className="text-xs font-semibold">
              {Math.round((item.vote_average ?? 0) * 10) / 10}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGridItem = ({ item }: { item: MovieItem }) => {
    console.log(item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MovieDetails', { movieId: item.id })
        }
        className={`m-2 bg-black ${numColumns === 3 ? 'flex-1' : ''}`}
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
            backgroundColor: '#111827',
          }}
          resizeMode="cover"
        />

        <View className="mt-2 px-1">
          <Text className="text-white text-sm font-semibold" numberOfLines={2}>
            {item?.title ?? item?.name ?? 'Untitled'}
          </Text>
          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-gray-400 text-xs">
              {item?.release_date?.slice?.(0, 4) ?? ''}
            </Text>
            <View className="px-2 py-0.5 bg-yellow-500 rounded-full">
              <Text className="text-xs font-medium">
                {Math.round((item.vote_average ?? 0) * 10) / 10}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooter = () => {
    if (!activeFetching) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size={30} color="#fff" />
        <Text className="text-gray-400 text-xs mt-2">Loading more...</Text>
      </View>
    );
  };

  if (activeLoading && pageNo === 1 && items.length === 0) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size={30} color="#fff" />
        <Text className="text-gray-300 mt-3">Loading...</Text>
      </View>
    );
  }

  if (activeError && items.length === 0) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white mb-4">Failed to load movies.</Text>
        <Pressable
          onPress={refreshList}
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          <Text className="text-white font-medium">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <View className="px-4 py-3 border-b border-gray-800 flex-row items-center justify-between">
        <Text className="text-white text-2xl font-bold">{title}</Text>

        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => setLayout(LAYOUTS.LIST)}
            className={`px-3 py-1 rounded ${
              layout === LAYOUTS.LIST ? 'bg-gray-700' : 'bg-gray-900'
            }`}
          >
            <LayoutList color={'white'} size={16} />
          </Pressable>

          <Pressable
            onPress={() => setLayout(LAYOUTS.GRID3)}
            className={`px-3 py-1 rounded ${
              layout === LAYOUTS.GRID3 ? 'bg-gray-700' : 'bg-gray-900'
            }`}
          >
            <LayoutGrid color={'white'} size={16} />
          </Pressable>
        </View>
      </View>

      <View className="flex-1">
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          style={{ flex: 1 }}
          renderItem={layout === LAYOUTS.LIST ? renderListItem : renderGridItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={ListFooter}
          numColumns={numColumns}
          // Important: when switching numColumns, force re-render by changing key
          key={numColumns}
          contentContainerStyle={items.length === 0 ? { flex: 1 } : {}}
          refreshing={activeFetching && pageNo === 1}
          onRefresh={refreshList}
        />
      </View>
    </View>
  );
};

export default SeeAll;
