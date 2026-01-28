import React, { useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Search } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { navigationRef } from '../navigation/navigationRef';
import { useColorScheme } from 'nativewind';

interface NavbarProps {
  setStep: (step: number) => void;
  step: number;
}

const Navbar = ({ step, setStep }: NavbarProps) => {
  const offset = useSharedValue(0);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    offset.value = step === 1 ? 5 : 105;
  }, [step]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, { damping: 30 }),
        },
      ],
    };
  });

  return (
    <View
      className={`${
        isDark ? 'bg-black' : 'bg-white'
      } flex-row justify-between items-center p-3`}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: 50, height: 50 }}
        resizeMode="cover"
        borderRadius={100}
      />

      <View className="relative">
        <View className="flex-row items-center gap-10">
          <Pressable onPress={() => setStep(1)}>
            <Text
              className={
                step === 1
                  ? isDark
                    ? 'text-white font-bold'
                    : 'text-black font-bold'
                  : isDark
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }
            >
              Movies
            </Text>
          </Pressable>

          <Pressable onPress={() => setStep(2)}>
            <Text
              className={
                step === 2
                  ? isDark
                    ? 'text-white font-bold'
                    : 'text-black font-bold'
                  : isDark
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }
            >
              TV Shows
            </Text>
          </Pressable>
        </View>

        <Animated.View
          style={[
            {
              height: 3,
              width: 45,
              backgroundColor: 'red',
              position: 'absolute',
              bottom: -10,
            },
            animatedIndicatorStyle,
          ]}
        />
      </View>

      <Search
        size={22}
        color={isDark ? 'white' : 'black'}
        onPress={() => navigationRef.navigate('Search')}
      />
    </View>
  );
};

export default Navbar;
