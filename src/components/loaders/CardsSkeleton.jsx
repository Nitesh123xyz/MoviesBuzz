import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

/* ---------------- GRID CONSTANTS (MATCH REAL UI) ---------------- */
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLUMNS = 3;
const GAP = 8;
const ITEM_WIDTH = Math.floor((SCREEN_WIDTH - GAP * (COLUMNS + 1)) / COLUMNS);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1.5);

/* ---------------- SHIMMER BOX ---------------- */
const SkeletonBox = ({ width, height, borderRadius = 12, style }) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, {
        duration: 2000, // slower = smoother
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmer.value,
      [0, 1],
      [-width * 1.6, width * 1.6], // long travel = no pop
    );

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
          borderRadius,
          overflow: 'hidden',
          backgroundColor: '#2a2a2a',
        },
        style,
      ]}
    >
      {/* SHIMMER BAND */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: width * 0.65,
            height: '100%',
            opacity: 0.25,
            backgroundColor: 'rgba(255,255,255,0.9)',
            transform: [{ skewX: '-15deg' }],
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

/* ---------------- GRID SKELETON ---------------- */
const CardsSkeleton = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme?.colorScheme === 'dark';

  return (
    <View className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: GAP }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <View
            key={index}
            style={{
              marginLeft: GAP,
              marginTop: GAP,
            }}
          >
            {/* Poster Skeleton */}
            <SkeletonBox width={ITEM_WIDTH} height={ITEM_HEIGHT} />

            {/* Title Skeleton */}
            <SkeletonBox
              width={ITEM_WIDTH * 0.85}
              height={12}
              borderRadius={6}
              style={{ marginTop: 6 }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CardsSkeleton;
