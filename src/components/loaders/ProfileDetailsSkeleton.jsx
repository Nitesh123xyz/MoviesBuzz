// PersonSkeleton.jsx
import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width } = Dimensions.get('window');

const ProfileDetailsSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item paddingHorizontal={16} paddingTop={12}>
        {/* Header buttons */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} />
          <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} />
        </SkeletonPlaceholder.Item>

        {/* Avatar */}
        <SkeletonPlaceholder.Item alignItems="center" marginTop={16}>
          <SkeletonPlaceholder.Item
            width={200}
            height={200}
            borderRadius={100}
          />
        </SkeletonPlaceholder.Item>

        {/* Name */}
        <SkeletonPlaceholder.Item alignItems="center" marginTop={12}>
          <SkeletonPlaceholder.Item
            width={width * 0.6}
            height={24}
            borderRadius={6}
          />
        </SkeletonPlaceholder.Item>

        {/* location / deathday */}
        <SkeletonPlaceholder.Item alignItems="center" marginTop={12}>
          <SkeletonPlaceholder.Item
            width={width * 0.5}
            height={14}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.35}
            height={14}
            borderRadius={4}
            marginTop={8}
          />
        </SkeletonPlaceholder.Item>

        {/* Info pills row */}
        <SkeletonPlaceholder.Item
          marginTop={16}
          paddingHorizontal={8}
          justifyContent="center"
        >
          <SkeletonPlaceholder.Item
            width={width - 32}
            height={56}
            borderRadius={28}
            alignItems="center"
            justifyContent="space-around"
            flexDirection="row"
          >
            {/* inside rounded pill: 4 blocks */}
            <SkeletonPlaceholder.Item
              width={(width - 96) / 4}
              height={40}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              width={(width - 96) / 4}
              height={40}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              width={(width - 96) / 4}
              height={40}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              width={(width - 96) / 4}
              height={40}
              borderRadius={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        {/* Also Known As */}
        <SkeletonPlaceholder.Item marginTop={18} paddingHorizontal={4}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={8}
            width={width - 48}
            height={12}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width - 120}
            height={12}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>

        {/* Biography (multiple lines) */}
        <SkeletonPlaceholder.Item marginTop={18} paddingHorizontal={4}>
          <SkeletonPlaceholder.Item width={140} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={10}
            width={width - 32}
            height={12}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width - 40}
            height={12}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width - 48}
            height={12}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width - 80}
            height={12}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={width - 64}
            height={12}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProfileDetailsSkeleton;
