import { X } from 'lucide-react-native';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useGetAllSearchMoviesQuery } from '../features/movies';
import { IMAGE_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { BackUpPosterImage } from '../utils/Backup';
import { DateFormatter } from '../utils/Formatter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  // -----------------------------------------------------

  const { data, isLoading, isFetching } = useGetAllSearchMoviesQuery(
    { query: searchQuery, page },
    { skip: !searchQuery },
  );

  const onPressSearch = () => {
    const trimmed = q.trim();

    if (!trimmed) {
      setSearchQuery('');
      setDisplayData([]);
      setPage(1);
      setTotalPages(1);
      return;
    }

    setSearchQuery(trimmed);
    setPage(1);
    setDisplayData([]);
    setTotalPages(1);
  };

  // keyboard submit
  const onSubmitEditing = () => onPressSearch();

  // Helper: dedupe by id and return merged array preserving order
  const mergeUniqueById = (base = [], additions = []) => {
    const seen = new Set(base.map(i => i?.id));
    const merged = [...base];
    for (const it of additions) {
      if (it?.id == null) {
        const fallback = `${it?.title ?? ''}::${it?.release_date ?? ''}`;
        if (!seen.has(fallback)) {
          seen.add(fallback);
          merged.push(it);
        }
      } else if (!seen.has(it.id)) {
        seen.add(it.id);
        merged.push(it);
      }
    }
    return merged;
  };

  // react to API data changes
  useEffect(() => {
    if (!data?.results) return;

    // total_pages if provided by API
    if (typeof data.total_pages === 'number') {
      setTotalPages(data.total_pages);
    }

    if (page === 1) {
      const unique = mergeUniqueById([], data.results || []);
      setDisplayData(unique);
    } else {
      setDisplayData(prev => mergeUniqueById(prev, data.results || []));
    }
  }, [data, page]);

  // Load next page if available
  const loadMore = () => {
    if (!searchQuery) return;
    if (isFetching || isLoading || isPaginating) return;
    if (page >= totalPages) return;

    setIsPaginating(true);
    setPage(prev => prev + 1);

    // small UX delay if you prefer (optional)
    setTimeout(() => {
      setIsPaginating(false);
    }, 500);
  };

  const keyExtractor = (item, index) => {
    if (item?.id != null) {
      return `${item.id}-${item.original_language ?? 'x'}`;
    }

    return `no-id-${item?.title ?? 'untitled'}-${
      item?.release_date ?? ''
    }-${index}`;
  };

  const renderItem = useCallback(({ item }) => {
    const poster = item?.poster_path
      ? `${IMAGE_BASE_URL}${item.poster_path}`
      : BackUpPosterImage;
    return (
      <TouchableOpacity
        key={keyExtractor(item?.id)}
        style={{ flexDirection: 'row', padding: 12, alignItems: 'flex-start' }}
        onPress={() =>
          navigation.navigate('MovieDetails', { movieId: item.id })
        }
      >
        <View
          style={{
            width: 100,
            height: 140,
          }}
          className="rounded-lg overflow-hidden"
        >
          <Image
            source={{
              uri: poster,
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />

          <View className="absolute left-[6px] top-[6px] bg-sky-500 px-[6px] py-[2px] rounded-[4px]">
            <Text className="text-white text-[11px] font-bold">
              {item?.original_language?.toUpperCase() || 'HI'}
            </Text>
          </View>
        </View>
        <View className="flex-1 ml-3 justify-between">
          <View>
            <Text className="text-white text-[16px] font-bold">
              <Text className="text-red-500">
                {item?.title?.slice(
                  0,
                  item?.title?.indexOf(' ') > -1 ? item.title.indexOf(' ') : 0,
                ) || ''}
              </Text>
              {item?.title?.replace(/^(\S+\s?)/, '') || item?.title}
            </Text>

            <Text className="text-[#9CA3AF] mt-1">
              {DateFormatter(item?.release_date)}
            </Text>
            <Text className="text-[#9CA3AF] mt-1" numberOfLines={2}>
              {item?.overview}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={{ paddingTop: insets.top }} className="px-3 pb-2 mt-4">
        <View className="flex-row items-center rounded-lg px-1 border border-gray-500">
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search..."
            placeholderTextColor="white"
            className="flex-1 text-white"
            returnKeyType="search"
            onSubmitEditing={onSubmitEditing}
          />
          {q && (
            <TouchableOpacity
              onPress={() => {
                setQ('');
                setSearchQuery('');
                setDisplayData([]);
                setPage(1);
              }}
              className="p-1.5"
            >
              <X color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="flex-1">
        <FlatList
          style={{ flex: 1 }}
          data={displayData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isPaginating || isFetching || isLoading ? (
              <View className="pb-20">
                <ActivityIndicator size={30} color="#fff" />
              </View>
            ) : null
          }
          ListEmptyComponent={
            !isLoading && !isFetching ? (
              <View className="pt-2 items-center">
                <Text className="text-white">No results</Text>
              </View>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
        />
      </View>
    </>
  );
}
