import { ActivityIndicator, View } from 'react-native';

interface Props {
  size: number;
  color: string;
}

const IndicatorLoader = ({ size = 100, color = 'red' }: Props) => {
  return (
    <View className="flex-1 h-screen justify-center items-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default IndicatorLoader;
