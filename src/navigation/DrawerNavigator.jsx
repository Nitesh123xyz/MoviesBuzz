// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNavigation from './HomeStackNavigation';
import MoviesScreen from '../screens/Testing';
// import ShowsScreen from '../screens/ShowsScreen';
// import LibraryScreen from '../screens/LibraryScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { Home, Film, Tv, Library, Settings } from 'lucide-react-native';

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
        drawerLabelStyle: { color: '#000', fontSize: 15, marginLeft: -5 },
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: '#b3b3b3',
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
      {/* <Drawer.Screen
        name="Shows"
        component={ShowsScreen}
        options={{
          drawerIcon: ({ color }) => <Tv size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          drawerIcon: ({ color }) => <Library size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => <Settings size={20} color={color} />,
        }}
      /> */}
    </Drawer.Navigator>
  );
}
