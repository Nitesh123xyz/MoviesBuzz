import { ActivityIndicator, View } from 'react-native';

const IndicatorLoader = ({ Size = 100, Color = 'red' }) => {
  return (
    <View className="flex-1 h-screen justify-center items-center">
      <ActivityIndicator size={Size} color={Color} />
    </View>
  );
};

export default IndicatorLoader;
