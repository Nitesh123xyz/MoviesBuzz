import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootLayout from './RootLayout';
import { navigationRef, isNavigationReadyRef } from './navigationRef';

export default function AppNavigation() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isNavigationReadyRef.current = true;
        }}
      >
        <RootLayout />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
