import { X, Search } from 'lucide-react-native';
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
import { BackUpPosterImage } from '../utils/Backup';
import { DateFormatter } from '../utils/Formatter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/RootStackParamList';

// --------------------------------------
interface SearchScreenItemsProps {
  item: {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string | null;
  };
}

// --------------------------------------

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const [q, setQ] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState<
    SearchScreenItemsProps['item'][]
  >([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);

  const theme = {
    bg: isDark ? 'bg-black' : 'bg-white',
    surface: isDark ? 'bg-black' : 'bg-white',
    inputBg: isDark ? 'bg-neutral-800' : 'bg-white',
    cardBg: isDark ? 'bg-black' : 'bg-white',
    primaryText: isDark ? 'text-white' : 'text-neutral-900',
    secondaryText: isDark ? 'text-neutral-400' : 'text-neutral-600',
    icon: isDark ? '#fff' : '#000',
  };

  const { data, isLoading, isFetching } = useGetAllSearchMoviesQuery(
    { query: searchQuery, page },
    { skip: !searchQuery },
  );

  const onSubmitEditing = () => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    setPage(1);
    setDisplayData([]);
  };

  useEffect(() => {
    if (!data?.results) return;

    if (page === 1) {
      setDisplayData(data.results);
    } else {
      setDisplayData(prev => [...prev, ...data.results]);
    }

    if (typeof data.total_pages === 'number') {
      setTotalPages(data.total_pages);
    }
  }, [data, page]);

  const loadMore = () => {
    if (!searchQuery || isFetching || isLoading || isPaginating) return;
    if (page >= totalPages) return;

    setIsPaginating(true);
    setPage(prev => prev + 1);
    setTimeout(() => setIsPaginating(false), 400);
  };

  const renderItem = useCallback(
    ({ item }: SearchScreenItemsProps) => {
      const poster = item?.poster_path
        ? `${IMAGE_BASE_URL}${item.poster_path}`
        : BackUpPosterImage;

      return (
        <TouchableOpacity
          className={`flex-row p-3 ${theme.cardBg}`}
          onPress={() =>
            navigation.navigate('MovieDetails', { movieId: item.id })
          }
        >
          <Image
            source={{ uri: poster }}
            className="w-[96px] h-[140px] rounded-lg"
          />

          <View className="flex-1 ml-3">
            <Text
              className={`text-[16px] font-semibold ${theme.primaryText}`}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text className={`text-xs mt-1 ${theme.secondaryText}`}>
              {DateFormatter(item.release_date)}
            </Text>

            <Text
              className={`text-xs mt-2 leading-4 ${theme.secondaryText}`}
              numberOfLines={3}
            >
              {item.overview}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [isDark],
  );

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000' : '#fff'}
      />

      {/* SINGLE UNIFIED SURFACE */}
      <View
        style={{ paddingTop: insets.top }}
        className={`flex-1 ${theme.surface}`}
      >
        {/* Search Bar (Part of same layout) */}
        <View className="px-4 pt-4 pb-2">
          <View
            className={`flex-row items-center h-14 rounded-full px-4 ${theme.inputBg}`}
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.12,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Search size={20} color={theme.icon} />

            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Search movies, shows, actors"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              className={`flex-1 ml-3 text-[15px] ${theme.primaryText}`}
              returnKeyType="search"
              onSubmitEditing={onSubmitEditing}
            />

            {q.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setQ('');
                  setSearchQuery('');
                  setDisplayData([]);
                  setPage(1);
                }}
              >
                <X size={18} color={theme.icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results - same background, no visual break */}
        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            isFetching || isPaginating ? (
              <View className="py-6">
                <ActivityIndicator size="small" color={theme.icon} />
              </View>
            ) : null
          }
          ListEmptyComponent={
            !isLoading && !isFetching ? (
              <View className="mt-20 items-center">
                <Text className={theme.secondaryText}>
                  Start typing to search movies
                </Text>
              </View>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </>
  );
}
