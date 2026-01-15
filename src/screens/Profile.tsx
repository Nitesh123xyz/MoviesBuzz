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

  // Animated value (no useEffect)
  const translateX = useRef(new Animated.Value(isDark ? 26 : 2)).current;

  const toggleTheme = () => {
    Animated.spring(translateX, {
      toValue: isDark ? 2 : 20,
      useNativeDriver: true,
      friction: 6,
    }).start();

    setColorScheme(isDark ? 'light' : 'dark');
  };

  // Logout Function
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await auth().signOut(); // Clears session
          } catch (error) {
            if (error instanceof Error) Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black px-6 pt-12">
      {/* Profile Info */}
      <View className="items-center">
        <View className="h-28 w-28 rounded-full bg-indigo-500 items-center justify-center">
          <Text className="text-white text-4xl font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text className="mt-4 text-xl font-semibold text-black dark:text-white">
          {user?.email?.split('@')[0]} {/* Display name from email */}
        </Text>

        <Text className="text-sm text-gray-500 dark:text-gray-400">
          ID: {user?.uid} {/* Real unique ID from Firebase */}
        </Text>
      </View>

      {/* Divider */}
      <View className="my-8 h-[1px] bg-gray-200 dark:bg-gray-700" />

      {/* Dark Mode Toggle */}
      <View className="flex-row items-center justify-between rounded-xl bg-gray-100 px-5 py-4 dark:bg-gray-900 mb-4">
        <Text className="text-base text-black dark:text-white">Dark Mode</Text>

        <Pressable
          onPress={toggleTheme}
          className={`w-14 h-8 rounded-full px-1 justify-center ${
            isDark ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <Animated.View
            style={{ transform: [{ translateX }] }}
            className="h-6 w-6 rounded-full bg-white shadow"
          />
        </Pressable>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center justify-between rounded-xl bg-red-50 px-5 py-4 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20"
      >
        <View className="flex-row items-center">
          <LogOut size={20} color="#ef4444" />
          <Text className="text-base text-red-600 dark:text-red-500 ml-3 font-medium">
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
