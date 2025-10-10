import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IMAGE_BASE_URL } from '@env';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MovieList = ({ title, MoviesApi, hideSeeAll = false }) => {
  const { results } = MoviesApi || {};
  const navigation = useNavigation();

  return (
    <View style={{ marginVertical: 8 }}>
      {/* Header */}
      <View
        style={{
          marginHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{ color: '#9CA3AF', fontSize: 16 }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Movie List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={screenWidth / 2 + 16}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 10,
          paddingTop: 10,
        }}
        nestedScrollEnabled={true} // <--- important
        keyboardShouldPersistTaps="handled" // help with touches
      >
        {results?.map((movie, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => navigation.push('MovieDetails', { movie })}
            style={{ marginHorizontal: 8 }}
          >
            <View style={{ width: screenWidth / 2 }}>
              <Image
                source={{
                  uri: `${IMAGE_BASE_URL}${
                    movie?.poster_path || movie?.backdrop_path
                  }`,
                }}
                style={{
                  width: screenWidth / 2,
                  height: screenHeight / 2.5,
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
              <Text
                numberOfLines={1}
                style={{
                  color: '#cbd5e1',
                  marginTop: 8,
                  width: screenWidth / 2,
                }}
              >
                {movie?.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
