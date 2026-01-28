import React from 'react';
import SearchScreen from '../screens/SearchScreen';
import SeeAll from '../screens/SeeAll';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import DetailsScreen from '../screens/DetailsScreen';
import PersonScreen from '../screens/PersonScreen';
import WatchListMovies from '../screens/WatchListMovies';
import Profile from '../screens/Profile';
import Favorite from '../screens/FavMovies';
import ManageScreen from '../screens/ManageScreen';
import GenresScreen from '../screens/GenresScreen';
import { RootStackParamList } from '../types/RootStackParamList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={ManageScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Library" component={WatchListMovies} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="PersonScreen" component={PersonScreen} />
      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="Genres" component={GenresScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
