// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNavigation from './HomeStackNavigation';
import MoviesScreen from '../screens/Testing';
// import ShowsScreen from '../screens/ShowsScreen';
// import LibraryScreen from '../screens/LibraryScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import FavMovies from '../screens/FavMovies';
import WatchListMovies from '../screens/WatchListMovies';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { Home, Film, Tv, Library, Settings, Heart } from 'lucide-react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1f1f1f',
          width: 280,
        },
        drawerLabelStyle: { fontSize: 15, marginLeft: -5 },
        drawerActiveTintColor: 'black',
        // drawerInactiveBackgroundColor: 'gray',
        drawerInactiveTintColor: 'white',
        drawerActiveBackgroundColor: 'yellow',
        drawerItemStyle: { borderRadius: 20, marginHorizontal: 10 },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          drawerIcon: ({ color }) => <Home size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          drawerIcon: ({ color }) => <Film size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Favorite"
        component={FavMovies}
        options={{
          drawerIcon: ({ color }) => <Heart size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Library"
        component={WatchListMovies}
        options={{
          drawerIcon: ({ color }) => <Library size={20} color={color} />,
        }}
      />
      {/* <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => <Settings size={20} color={color} />,
        }}
      /> */}
    </Drawer.Navigator>
  );
}
