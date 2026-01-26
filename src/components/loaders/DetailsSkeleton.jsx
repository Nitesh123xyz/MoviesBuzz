import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SkeletonBox = ({ width, height, style }) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmer.value, [0, 1], [-width, width]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: '#2a2a2a',
          overflow: 'hidden',
          borderRadius: 8,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.12)',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const DetailsSkeleton = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'} px-3 pt-2`}>
      {/* Poster */}
      <SkeletonBox
        width={SCREEN_WIDTH - 15}
        height={Dimensions.get('window').height * 0.3}
        style={{ borderRadius: 16, marginBottom: 20 }}
      />

      {/* Title */}
      <SkeletonBox
        width={SCREEN_WIDTH * 0.6}
        height={22}
        style={{ alignSelf: 'center' }}
      />

      {/* Meta Row */}
      <View className="flex-row justify-center gap-3 mt-5">
        <SkeletonBox width={70} height={14} />
        <SkeletonBox width={60} height={14} />
        <SkeletonBox width={90} height={14} />
        <SkeletonBox width={50} height={14} />
      </View>

      {/* Genres */}
      <SkeletonBox
        width={SCREEN_WIDTH * 0.8}
        height={14}
        style={{ alignSelf: 'center', marginVertical: 20 }}
      />

      {/* Overview */}
      <View className="gap-2 justify-center items-center">
        <SkeletonBox width={SCREEN_WIDTH - 60} height={12} />
        <SkeletonBox width={SCREEN_WIDTH - 60} height={12} />
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between px-8 mt-8">
        <SkeletonBox width={50} height={50} style={{ borderRadius: 50 }} />
        <SkeletonBox width={50} height={50} style={{ borderRadius: 50 }} />
        <SkeletonBox width={50} height={50} style={{ borderRadius: 50 }} />
      </View>
    </View>
  );
};

export default DetailsSkeleton;
