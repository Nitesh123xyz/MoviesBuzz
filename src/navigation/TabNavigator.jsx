import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './HomeStackNavigation';
import FavMovies from '../screens/FavMovies';
import WatchListMovies from '../screens/WatchListMovies';
import Profile from '../screens/Profile';
import { Home, User, Heart, Library } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#27272a' : '#ffffff',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: isDark ? '#ffffff' : '#000000',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#6b7280',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color }) => <Home size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavMovies}
        options={{
          tabBarIcon: ({ color }) => <Heart size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={WatchListMovies}
        options={{
          tabBarIcon: ({ color }) => <Library size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <User size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
