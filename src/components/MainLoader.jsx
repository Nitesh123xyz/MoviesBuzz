import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const MainLoader = () => {
  return (
    <View
      className="fixed inset-0 justify-center items-center z-[999]"
      pointerEvents="auto"
    >
      <View className="p-1.5 bg-white/15 backdrop-blur-lg rounded-full shadow-lg">
        <ActivityIndicator size={30} color="#fff" />
      </View>
    </View>
  );
};

export default MainLoader;
