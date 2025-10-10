import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CastSkeleton = () => {
  const placeholders = new Array(8).fill(0);

  return (
    <>
      <Text className="text-white text-lg mx-4 mb-2">Top Cast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 6, paddingBottom: 20 }}
      >
        {placeholders.map((_, i) => (
          <View key={i} style={{ alignItems: 'center', marginHorizontal: 8 }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item alignItems="center">
                <SkeletonPlaceholder.Item
                  width={80}
                  height={80}
                  borderRadius={40}
                />

                {/* name bar */}
                <SkeletonPlaceholder.Item marginTop={8}>
                  <SkeletonPlaceholder.Item
                    width={60}
                    height={10}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default CastSkeleton;
