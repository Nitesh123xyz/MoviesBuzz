import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

/* -------------------- Shimmer Block -------------------- */
const ShimmerBlock = ({
  blockWidth,
  blockHeight,
  borderRadius = 8,
  speed = 1200,
  style,
}) => {
  const progress = useSharedValue(0);
  const numericWidth = typeof blockWidth === 'number' ? blockWidth : width;

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: speed }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [-numericWidth, numericWidth],
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[
        {
          width: blockWidth,
          height: blockHeight,
          borderRadius,
          backgroundColor: '#2d2d2d',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            width: numericWidth * 2,
            height: '100%',
            position: 'absolute',
            left: -numericWidth,
          },
          animatedStyle,
        ]}
        pointerEvents="none"
      ></Animated.View>
    </View>
  );
};

/* -------------------- Details Skeleton -------------------- */
const DetailsSkeleton = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View
      style={styles.container}
      className={`${isDark ? 'bg-black' : 'bg-white'}`}
    >
      {/* Poster */}
      <View className="flex-row justify-between mt-2">
        <ShimmerBlock
          blockWidth={40}
          blockHeight={40}
          style={{ borderRadius: 80 }}
        />
        <ShimmerBlock
          blockWidth={40}
          blockHeight={40}
          style={{ borderRadius: 80 }}
        />
      </View>
      <View className="items-center mt-5">
        <ShimmerBlock
          blockWidth={width - 110}
          blockHeight={height * 0.35}
          borderRadius={500}
        />
      </View>

      {/* Title */}
      <View style={styles.center}>
        <ShimmerBlock blockWidth={width * 0.6} blockHeight={22} />
      </View>

      {/* Meta Row */}
      <View style={styles.metaRow}>
        <ShimmerBlock blockWidth={70} blockHeight={14} />
        <ShimmerBlock blockWidth={60} blockHeight={14} />
        <ShimmerBlock blockWidth={90} blockHeight={14} />
        <ShimmerBlock blockWidth={50} blockHeight={14} />
      </View>

      {/* Genres */}
      <View style={styles.center}>
        <ShimmerBlock blockWidth={width * 0.75} blockHeight={14} />
      </View>

      {/* Overview */}
      <View style={styles.textBlock}>
        <ShimmerBlock blockWidth={width - 32} blockHeight={12} />
        <Spacer />
        <ShimmerBlock blockWidth={width - 48} blockHeight={12} />
        <Spacer />
        <ShimmerBlock blockWidth={width - 64} blockHeight={12} />
        <Spacer />
        <ShimmerBlock blockWidth={width - 96} blockHeight={12} />
      </View>
    </View>
  );
};

export default DetailsSkeleton;

/* -------------------- Helpers -------------------- */
const Spacer = () => <View style={{ height: 8 }} />;

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  center: {
    alignItems: 'center',
    marginTop: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 18,
  },
  textBlock: {
    alignItems: 'center',
    marginTop: 20,
  },
  actions: {
    marginTop: 28,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
