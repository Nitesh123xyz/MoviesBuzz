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
import { Funnel } from 'lucide-react-native';
import { BackUpCastImage } from '../utils/Backup';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { RootStackParamList } from 'src/types/RootStackParamList';
import Rating from '../components/Rating';
import CardsSkeleton from '../components/loaders/CardsSkeleton';

// ------------------------------------

interface WatchListMoviesProps {
  id: number | string;
  title: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
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
    backgroundColor: isDark ? 'bg-black' : 'bg-white',
    textColor: isDark ? 'text-white' : 'text-neutral-900',
    borderLine: isDark ? 'border-neutral-800' : 'border-neutral-200',
    secondaryText: isDark ? 'text-neutral-400' : 'text-neutral-600',
    filterColor: isDark ? 'bg-white/40' : 'bg-black/10',
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

  const toggleSort = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  /* ---------------- GRID ITEM ---------------- */
  const renderGridItem = ({ item }: { item: WatchListMoviesProps }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginLeft: GAP, marginTop: GAP }}
      onPress={() => navigation.navigate('DetailsScreen', { movieId: item.id })}
    >
      <View style={{ width: GRID_ITEM_WIDTH }}>
        <View
          className={`${theme.backgroundColor} rounded-lg overflow-hidden`}
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
          <Rating RatingNumber={item?.vote_average ?? 0} />
        </View>

        <Text numberOfLines={2} className={`text-xs mt-1 ${theme.textColor}`}>
          {item.title ?? item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (!uid) {
    return (
      <View
        className={`flex-1 justify-center items-center ${theme.backgroundColor}`}
      >
        <Text className={theme.secondaryText}>Not signed in</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${theme.backgroundColor} `}>
      <View
        className={`flex-row items-center justify-between px-4 py-3 border-b ${theme.borderLine}`}
      >
        <Text className={`${theme.textColor} text-2xl font-bold uppercase`}>
          Watchlist
        </Text>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={toggleSort}
            className={`${theme.filterColor} p-2 rounded-md`}
          >
            <Funnel size={18} color={isDark ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View className="flex-1">
          <CardsSkeleton />
        </View>
      ) : (
        <FlatList
          data={movies}
          key={viewMode}
          numColumns={COLUMNS}
          decelerationRate={0.8}
          renderItem={renderGridItem}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
};

export default WatchListMovies;
