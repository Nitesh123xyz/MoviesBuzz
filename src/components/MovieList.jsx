import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const MovieList = ({ title, MoviesApi, hideSeeAll = false }) => {
  const navigation = useNavigation();

  return (
    <View className="space-y-4">
      {/* Header */}
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg font-light">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg font-light text-gray-400">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Movie List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={screenWidth / 2 + 16} // snapping interval
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        {MoviesApi?.map((movie, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push('MovieDetails', { movie: movie })}
          >
            <View className="space-y-1 mx-2">
              <Image
                source={{ uri: movie.url }}
                className="rounded-lg"
                style={{
                  width: screenWidth / 2,
                  height: screenHeight / 3.5,
                }}
              />

              <Text
                numberOfLines={1}
                className="text-neutral-300 mt-1"
                style={{ width: screenWidth / 2 }}
              >
                {movie?.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
