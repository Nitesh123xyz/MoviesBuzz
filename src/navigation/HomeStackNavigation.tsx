import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SeeAll from '../screens/SeeAll';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import DetailsScreen from '../screens/DetailsScreen';
import PersonScreen from '../screens/PersonScreen';
import { RootStackParamList } from 'src/types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MovieDetails" component={DetailsScreen} />
      <Stack.Screen name="PersonScreen" component={PersonScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
