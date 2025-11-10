import React, { useRef, useEffect } from 'react';
import {
  Dimensions,
  View,
  Text,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');
const posterRatio = 1.5;
const carouselHeight = Math.round(screenWidth * posterRatio);
const CARD_WIDTH = Math.round(screenWidth * 0.9);

const ShimmerPlaceholder = ({
  width,
  height,
  borderRadius = 8,
  speed = 1200,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  // convert width string "100%" to number fallback
  const numericWidth = typeof width === 'number' ? width : screenWidth;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: speed,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim, speed]);

  // translateX goes from -numericWidth to +numericWidth
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-numericWidth, numericWidth],
  });

  return (
    <View
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius,
          overflow: 'hidden',
        },
      ]}
    >
      {/* Static background block (base color) */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#2d2d2d' }]} />

      {/* Animated shimmer */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
            // make the animated strip wider than container for smooth fade:
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
            'rgba(255,255,255,0.03)',
            '#6b7280',
            'rgba(255,255,255,0.03)',
          ]}
          locations={[0.15, 0.5, 0.85]}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const HomeSkeleton = () => {
  const placeholderCount = 1;
  const placeholderData = Array.from({ length: placeholderCount });

  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.title}>Trending</Text>

      <View style={{ alignItems: 'center' }}>
        <Carousel
          loop
          width={screenWidth}
          height={carouselHeight}
          data={placeholderData}
          defaultIndex={1}
          pagingEnabled
          mode="parallax"
          windowSize={3}
          containerStyle={{ marginTop: -50 }}
          modeConfig={{
            parallaxScrollingScale: 0.78,
          }}
          scrollAnimationDuration={500}
          renderItem={() => (
            <View
              style={{
                width: screenWidth,
                height: carouselHeight,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Card wrapper */}
              <View
                style={{
                  width: CARD_WIDTH,
                  height: carouselHeight,
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                {/* Poster area shimmer (full card) */}
                <ShimmerPlaceholder
                  width={CARD_WIDTH}
                  height={carouselHeight}
                  borderRadius={14}
                  speed={900}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#2d2d2d',
  },
  title: {
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    marginLeft: 20,
    marginVertical: 8,
    color: '#fff',
  },
});
