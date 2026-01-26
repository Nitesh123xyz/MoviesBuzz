import React, { useState, useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { IMAGE_BASE_URL } from '@env';
import { ArrowDownUp, ArrowUpDown, Grid2X2, List } from 'lucide-react-native';
import { BackUpCastImage } from '../utils/Backup';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { RootStackParamList } from 'src/types/RootStackParamList';

// ------------------------------------

interface WatchListMoviesProps {
  id: number | string;
  title: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
}

// ------------------------------------

/* ---------------- CONSTANTS ---------------- */
const { width } = Dimensions.get('window');
const COLUMNS = 3;
const GAP = 8;
const GRID_ITEM_WIDTH = Math.floor((width - GAP * (COLUMNS + 1)) / COLUMNS);
const GRID_ITEM_HEIGHT = Math.round(GRID_ITEM_WIDTH * 1.5);

/* ---------------- COMPONENT ---------------- */
const WatchListMovies = () => {
  // ✅ CORRECT NativeWind usage (NO destructuring)
  const colorScheme = useColorScheme();
  const isDark = colorScheme?.colorScheme === 'dark';

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [uid, setUid] = useState<string | null>(null);
  const [movies, setMovies] = useState<WatchListMoviesProps[]>([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* ---------------- THEME ---------------- */
  const theme = {
    bg: isDark ? 'bg-black' : 'bg-white',
    card: isDark ? 'bg-black' : 'bg-white',
    textPrimary: isDark ? 'text-white' : 'text-neutral-900',
    textSecondary: isDark ? 'text-neutral-400' : 'text-neutral-600',
    chip: isDark ? 'bg-white/15' : 'bg-black/10',
    icon: isDark ? '#fff' : '#000',
  };

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUid(user ? user.uid : null);
    });
    return unsubscribe;
  }, []);

  /* ---------------- FETCH WATCHLIST ---------------- */
  const fetchWatchList = useCallback(() => {
    if (!uid) {
      setMovies([]);
      setLoading(false);
      return () => {};
    }

    setLoading(true);

    return firestore()
      .collection('users')
      .doc(uid)
      .collection('WatchList')
      .onSnapshot(
        snap => {
          const list = snap.docs.map(
            doc =>
              ({
                id: doc.id,
                ...doc.data(),
              } as WatchListMoviesProps),
          );
          setMovies(list);
          setLoading(false);
          setRefreshing(false);
        },
        () => {
          setMovies([]);
          setLoading(false);
          setRefreshing(false);
        },
      );
  }, [uid]);

  useEffect(() => {
    const unsub = fetchWatchList();
    return unsub;
  }, [fetchWatchList]);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(true);
      const unsub = fetchWatchList();
      return () => unsub && unsub();
    }, [fetchWatchList]),
  );

  /* ---------------- SORT ---------------- */
  const toggleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  /* ---------------- GRID ITEM ---------------- */
  const renderGridItem = ({ item }: { item: WatchListMoviesProps }) => (
    <TouchableOpacity
      style={{ marginLeft: GAP, marginTop: GAP }}
      onPress={() => navigation.navigate('DetailsScreen', { movieId: item.id })}
    >
      <View style={{ width: GRID_ITEM_WIDTH }}>
        <View
          className={`${theme.card} rounded-lg overflow-hidden`}
          style={{ height: GRID_ITEM_HEIGHT }}
        >
          <Image
            source={{
              uri: item.poster_path
                ? `${IMAGE_BASE_URL}${item.poster_path}`
                : BackUpCastImage,
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        <Text numberOfLines={2} className={`text-xs mt-1 ${theme.textPrimary}`}>
          {item.title ?? item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /* ---------------- LIST ITEM ---------------- */
  const renderListItem = ({ item }: { item: WatchListMoviesProps }) => (
    <TouchableOpacity
      className={`flex-row p-3 ${theme.card}`}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : BackUpCastImage,
        }}
        className="w-[80px] h-[120px] rounded-md"
      />

      <View className="ml-3 flex-1">
        <Text
          numberOfLines={2}
          className={`text-sm font-semibold ${theme.textPrimary}`}
        >
          {item.title ?? item.name}
        </Text>

        {item.release_date && (
          <Text className={`text-xs mt-1 ${theme.textSecondary}`}>
            {item.release_date}
          </Text>
        )}
      </View>

      {/* <View className="mt-2 inline-flex flex-row items-center">
        <View className="px-2 py-1 bg-yellow-500 rounded-full">
          <Text className="text-xs font-semibold">
            {Math.round((item.vote_average ?? 0) * 10) / 10}
          </Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );

  /* ---------------- STATES ---------------- */
  if (!uid) {
    return (
      <View className={`flex-1 justify-center items-center ${theme.bg}`}>
        <Text className={theme.textSecondary}>Not signed in</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${theme.bg}`}>
        <ActivityIndicator size="large" color={theme.icon} />
      </View>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <View className={`flex-1 ${theme.bg}`}>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className={`text-lg font-semibold ${theme.textPrimary}`}>
          Watchlist
        </Text>

        <View className="flex-row items-center gap-3">
          {/* GRID / LIST TOGGLE */}
          <TouchableOpacity
            onPress={() =>
              setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'))
            }
            className={`${theme.chip} p-2 rounded-md`}
          >
            {viewMode === 'grid' ? (
              <Grid2X2 size={18} color={theme.icon} />
            ) : (
              <List size={18} color={theme.icon} />
            )}
          </TouchableOpacity>

          {/* SORT */}
          <TouchableOpacity
            onPress={toggleSort}
            className={`${theme.chip} p-2 rounded-md`}
          >
            {sortOrder === 'asc' ? (
              <ArrowDownUp size={18} color={theme.icon} />
            ) : (
              <ArrowUpDown size={18} color={theme.icon} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENT */}
      <FlatList
        data={movies}
        key={viewMode} // IMPORTANT: forces layout recalculation
        numColumns={viewMode === 'grid' ? COLUMNS : 1}
        renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
      />
    </View>
  );
};

export default WatchListMovies;
