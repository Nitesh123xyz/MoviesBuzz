import React, { useRef } from 'react';
import { View, Text, Image, Pressable, Animated } from 'react-native';
import { useColorScheme } from 'nativewind';

const Profile = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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

  return (
    <View className="flex-1 bg-white dark:bg-black px-6 pt-12">
      {/* Profile Info */}
      <View className="items-center">
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          className="h-28 w-28 rounded-full"
        />

        <Text className="mt-4 text-xl font-semibold text-black dark:text-white">
          Nitesh Kumar
        </Text>

        <Text className="text-sm text-gray-500 dark:text-gray-400">
          ID: UID-2026-001
        </Text>
      </View>

      {/* Divider */}
      <View className="my-8 h-[1px] bg-gray-200 dark:bg-gray-700" />

      {/* Dark Mode Toggle */}
      <View className="flex-row items-center justify-between rounded-xl bg-gray-100 px-5 py-4 dark:bg-gray-900">
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
    </View>
  );
};

export default Profile;
