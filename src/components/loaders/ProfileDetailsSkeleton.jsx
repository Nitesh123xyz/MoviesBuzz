import React, { useRef, useEffect } from 'react';
import { Dimensions, View, Animated, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ShimmerBlock = ({
  blockWidth,
  blockHeight,
  borderRadius = 6,
  speed = 1000,
  style,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;
  const numericWidth = typeof blockWidth === 'number' ? blockWidth : width;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: speed,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer, speed]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-numericWidth, numericWidth],
  });

  return (
    <View
      style={[
        {
          width: blockWidth,
          height: blockHeight,
          borderRadius,
          overflow: 'hidden',
          backgroundColor: '#2d2d2d',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
            width: numericWidth * 2,
            left: -numericWidth,
          },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={[
            'rgba(255,255,255,0.02)',
            '#6b7280',
            'rgba(255,255,255,0.02)',
          ]}
          locations={[0.15, 0.5, 0.85]}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const ProfileDetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header row (two circular buttons) */}
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <ShimmerBlock blockWidth={40} blockHeight={40} borderRadius={20} />
        <ShimmerBlock blockWidth={40} blockHeight={40} borderRadius={20} />
      </View>

      {/* Avatar */}
      <View style={[styles.center, { marginTop: 16 }]}>
        <ShimmerBlock blockWidth={200} blockHeight={200} borderRadius={100} />
      </View>

      {/* Name */}
      <View style={[styles.center, { marginTop: 12 }]}>
        <ShimmerBlock
          blockWidth={Math.round(width * 0.6)}
          blockHeight={24}
          borderRadius={6}
        />
      </View>

      {/* location / deathday */}
      <View style={[styles.center, { marginTop: 12 }]}>
        <ShimmerBlock blockWidth={Math.round(width * 0.5)} blockHeight={14} />
        <View style={{ height: 8 }} />
        <ShimmerBlock blockWidth={Math.round(width * 0.35)} blockHeight={14} />
      </View>

      {/* Info pills row */}
      <View
        style={{ marginTop: 16, paddingHorizontal: 8, alignItems: 'center' }}
      >
        <View
          style={{
            width: width - 32,
            height: 56,
            borderRadius: 28,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: '#2d2d2d',
          }}
        >
          <ShimmerBlock
            blockWidth={(width - 96) / 4}
            blockHeight={40}
            borderRadius={20}
          />
          <ShimmerBlock
            blockWidth={(width - 96) / 4}
            blockHeight={40}
            borderRadius={20}
          />
          <ShimmerBlock
            blockWidth={(width - 96) / 4}
            blockHeight={40}
            borderRadius={20}
          />
          <ShimmerBlock
            blockWidth={(width - 96) / 4}
            blockHeight={40}
            borderRadius={20}
          />
        </View>
      </View>

      {/* Also Known As */}
      <View style={{ marginTop: 18, paddingHorizontal: 4 }}>
        <ShimmerBlock blockWidth={120} blockHeight={20} borderRadius={4} />
        <View style={{ height: 8 }} />
        <ShimmerBlock
          blockWidth={width - 48}
          blockHeight={12}
          borderRadius={4}
        />
        <View style={{ height: 6 }} />
        <ShimmerBlock
          blockWidth={width - 120}
          blockHeight={12}
          borderRadius={4}
        />
      </View>

      {/* Biography (multiple lines) */}
      <View style={{ marginTop: 18, paddingHorizontal: 4 }}>
        <ShimmerBlock blockWidth={140} blockHeight={20} borderRadius={4} />
        <View style={{ height: 10 }} />
        <ShimmerBlock
          blockWidth={width - 32}
          blockHeight={12}
          borderRadius={4}
        />
        <View style={{ height: 6 }} />
        <ShimmerBlock
          blockWidth={width - 40}
          blockHeight={12}
          borderRadius={4}
        />
        <View style={{ height: 6 }} />
        <ShimmerBlock
          blockWidth={width - 48}
          blockHeight={12}
          borderRadius={4}
        />
        <View style={{ height: 6 }} />
        <ShimmerBlock
          blockWidth={width - 80}
          blockHeight={12}
          borderRadius={4}
        />
        <View style={{ height: 6 }} />
        <ShimmerBlock
          blockWidth={width - 64}
          blockHeight={12}
          borderRadius={4}
        />
      </View>
    </View>
  );
};

export default ProfileDetailsSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    marginLeft: 20,
    marginVertical: 8,
    color: '#fff',
  },
});
