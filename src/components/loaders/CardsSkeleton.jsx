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

/* ---------------- GRID CONSTANTS (MATCH WATCHLISTMOVIES) ---------------- */
const COLUMNS = 3;
const GAP = 5;
const GRID_ITEM_WIDTH = Math.floor(
  (SCREEN_WIDTH - GAP * (COLUMNS + 1)) / COLUMNS,
);
const GRID_ITEM_HEIGHT = Math.round(GRID_ITEM_WIDTH * 1.5);

/* ---------------- SHIMMER BOX ---------------- */
const SkeletonBox = ({ width, height, borderRadius = 8, style }) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmer.value,
      [0, 1],
      [-width * 1.5, width * 1.5],
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
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            width: width * 0.6,
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.12)',
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
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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
            <SkeletonBox width={GRID_ITEM_WIDTH} height={GRID_ITEM_HEIGHT} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CardsSkeleton;
