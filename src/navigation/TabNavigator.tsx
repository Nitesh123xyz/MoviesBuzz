import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './HomeStackNavigation';
import FavMovies from '../screens/FavMovies';
import WatchListMovies from '../screens/WatchListMovies';
import Profile from '../screens/Profile';
import {
  Home,
  User,
  Heart,
  Library,
  Settings,
  Search,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import SearchScreen from '../screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import PersonScreen from '../screens/PersonScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MovieDetails" component={DetailsScreen} />
      <Stack.Screen name="PersonScreen" component={PersonScreen} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Favorite" component={FavMovies} />
      <Stack.Screen name="MovieDetails" component={DetailsScreen} />
      <Stack.Screen name="PersonScreen" component={PersonScreen} />
    </Stack.Navigator>
  );
}

function LibraryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Library" component={WatchListMovies} />
      <Stack.Screen name="MovieDetails" component={DetailsScreen} />
      <Stack.Screen name="PersonScreen" component={PersonScreen} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'shift',
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
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color }) => <Search size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{
          tabBarIcon: ({ color }) => <Library size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStack}
        options={{
          tabBarIcon: ({ color }) => <Heart size={20} color={color} />,
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
