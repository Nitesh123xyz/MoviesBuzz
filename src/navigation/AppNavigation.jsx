import { NavigationContainer } from '@react-navigation/native';
import { lazy, Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DrawerNavigator = lazy(() => import('./DrawerNavigator'));

const AppNavigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Suspense fallback={null}>
          <DrawerNavigator />
        </Suspense>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigation;
