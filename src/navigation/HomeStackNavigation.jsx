import React, { lazy, Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = lazy(() => import('../screens/HomeScreen'));
const DetailsScreen = lazy(() => import('../screens/DetailsScreen'));
const PersonScreen = lazy(() => import('../screens/PersonScreen'));
const SearchScreen = lazy(() => import('../screens/SearchScreen'));
const SeeAll = lazy(() => import('../screens/SeeAll'));

const HomeStackNavigation = () => {
  return (
    <Suspense fallback={null}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // cardStyle: { backgroundColor: '#262626' },
          gestureEnabled: true,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="HomeMain" component={HomeScreen} />
        <Stack.Screen
          name="MovieDetails"
          component={DetailsScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Person"
          component={PersonScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="SeeAll"
          component={SeeAll}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </Suspense>
  );
};

export default HomeStackNavigation;
