import React, { useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import auth from '@react-native-firebase/auth';
import { LogOut } from 'lucide-react-native';

const Profile = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const user = auth().currentUser;

  /* ---------------- THEME ---------------- */
  const theme = {
    backgroundColor: isDark ? 'bg-black' : 'bg-white',
    textColor: isDark ? 'text-white' : 'text-neutral-900',
    borderLine: isDark ? 'border-neutral-800' : 'border-neutral-200',
    secondaryText: isDark ? 'text-neutral-400' : 'text-neutral-600',
    logoutButton: isDark ? 'bg-white/20' : 'bg-black/15',
  };

  const translateX = useRef(new Animated.Value(isDark ? 20 : 2)).current;

  const toggleTheme = () => {
    Animated.spring(translateX, {
      toValue: isDark ? 2 : 20,
      useNativeDriver: true,
      friction: 5,
    }).start();

    setColorScheme(isDark ? 'light' : 'dark');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            if (error instanceof Error) Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  return (
    <View className={`flex-1 px-6 pt-12 ${theme.backgroundColor}`}>
      <View className="items-center">
        <View className="h-28 w-28 rounded-full bg-indigo-500 items-center justify-center">
          <Text className={`text-4xl font-bold ${theme.textColor}`}>
            {user?.email?.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text className={`mt-4 text-xl font-semibold ${theme.textColor}`}>
          {user?.email?.split('@')[0]}
        </Text>

        <Text className={`text-sm ${theme.secondaryText}`}>
          ID: {user?.uid}
        </Text>
      </View>

      <View className={`my-8 border-1 border-b ${theme.borderLine}`} />

      <View className="flex-row items-center justify-between rounded-xl bg-card-bg dark:bg-card-bg-dark px-5 py-4 mb-4">
        <Text className={`text-base ${theme.textColor}`}>Dark Mode</Text>

        <Pressable
          onPress={toggleTheme}
          className={`w-14 h-8 rounded-full px-1 justify-center ${
            isDark ? 'bg-gray-300' : 'bg-gray-300'
          }`}
        >
          <Animated.View
            style={{ transform: [{ translateX }] }}
            className="h-6 w-6 rounded-full bg-white shadow"
          />
        </Pressable>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleLogout}
        className={`flex-row items-center rounded-xl px-5 py-4 ${theme.logoutButton}`}
      >
        <LogOut size={20} color={isDark ? 'white' : 'black'} />
        <Text className={`text-base ml-3 font-medium ${theme.textColor}`}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
