import { View } from 'react-native';
import HomeStackNavigation from './RootStack';
import CustomTabBar from './CustomTabBar';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <HomeStackNavigation />
      <CustomTabBar />
    </View>
  );
}
