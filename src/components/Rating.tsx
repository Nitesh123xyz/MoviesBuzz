import { Text, View } from 'react-native';
import { RatingFormatter } from '../utils/Formatter';

const Rating = ({ RatingNumber = 0 }: { RatingNumber?: number }) => {
  return (
    <View className="absolute top-0 right-0 bg-blue-500 w-10 h-5 flex items-center justify-center rounded-tr-lg rounded-bl-lg">
      <Text className="text-xs text-white font-medium">
        {RatingFormatter(RatingNumber ?? 0)}
      </Text>
    </View>
  );
};

export default Rating;
