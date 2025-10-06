import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import MoviesApi from '../utils/dummy';
import MainLoader from '../components/MainLoader';
const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(MoviesApi);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const filtered = q
        ? MoviesApi.filter(m => m.title.toLowerCase().includes(q))
        : MoviesApi;

      setData(filtered);
      setLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} className="flex-1">
      <Image source={{ uri: item.url }} className="w-full h-64 rounded-lg" />
      <View>
        <Text
          numberOfLines={1}
          className="text-white text-sm font-semibold mt-1"
        >
          {item.title}
        </Text>
        <Text className="text-gray-400 text-xs">{item.releaseDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
      <Text className="text-2xl text-center text-white">Search</Text>

      <View className="flex-row items-center mt-4 border rounded-full border-gray-400 px-2 py-1">
        <TextInput
          value={query}
          onChangeText={setQuery}
          className="flex-1 text-base text-white"
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity
          onPress={() => setQuery('')}
          className={`rounded-full p-2 bg-neutral-500 ${
            query.length ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <X color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row mt-2">
        <Text className="text-white text-sm">Results</Text>
        <Text className="text-white text-sm ml-1">({data.length})</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 15 }}
        ListFooterComponent={loading ? <MainLoader /> : null}
        ListEmptyComponent={() => (
          <View className="my-3 items-center justify-center">
            <Image
              source={require('../assets/images/movie.png')}
              className="w-full h-64 rounded-lg"
            />
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
