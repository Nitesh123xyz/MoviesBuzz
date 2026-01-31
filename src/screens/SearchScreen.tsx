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
import Rating from '../components/Rating';

// --------------------------------------
interface SearchScreenItemsProps {
  item: {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
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
    backgroundColor: isDark ? 'bg-black' : 'bg-white',
    inputBgColor: isDark ? 'bg-neutral-800' : 'bg-white',
    textColor: isDark ? 'text-white' : 'text-black',
    secondaryText: isDark ? 'text-neutral-400' : 'text-neutral-600',
    iconColor: isDark ? 'text-white' : 'text-black',
    borderLine: isDark ? 'border-neutral-800' : 'border-neutral-200',
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
          activeOpacity={0.8}
          className={`flex-row p-3 border-b ${theme.borderLine} ${theme.backgroundColor}`}
          onPress={() =>
            navigation.navigate('DetailsScreen', { movieId: item.id })
          }
        >
          <View className="relative">
            <Image
              source={{ uri: poster }}
              className="w-[96px] h-[140px] rounded-lg"
            />

            <Rating RatingNumber={item?.vote_average} />
          </View>

          <View className="flex-1 ml-3">
            <Text
              className={`text-[16px] font-semibold ${theme.textColor}`}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text className={`text-xs mt-1 ${theme.secondaryText}`}>
              {DateFormatter(item.release_date)}
            </Text>

            <Text
              className={`text-xs mt-2 leading-4 ${theme.secondaryText}`}
              numberOfLines={5}
            >
              {item.overview}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [isDark],
  );

  const ListFooter = () => {
    if (!isFetching || !isPaginating) return null;
    if (isFetching || isPaginating)
      return (
        <View className="my-20 items-center">
          <ActivityIndicator size={30} color="red" />
          <Text className="text-gray-400 text-xs mt-2">Loading more...</Text>
        </View>
      );
  };

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#000' : '#fff'}
      />

      <View
        style={{ paddingTop: insets.top }}
        className={`flex-1 ${theme.backgroundColor}`}
      >
        <View className="px-4 pt-4 pb-2">
          <View
            className={`flex-row items-center h-14 rounded-full px-4 ${theme.inputBgColor}`}
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.12,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Search size={20} color={theme.iconColor} />

            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Search movies, shows, actors"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              className={`flex-1 ml-3 text-[15px] ${theme.textColor}`}
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
                <X size={18} color={theme.iconColor} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMore}
          showsVerticalScrollIndicator={false}
          decelerationRate={0.8}
          onEndReachedThreshold={0.6}
          ListFooterComponent={ListFooter}
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
