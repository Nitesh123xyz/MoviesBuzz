import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const MainLoader = () => {
  return (
    <View
      className="fixed inset-0 justify-center items-center z-[999]"
      pointerEvents="auto"
    >
      <ActivityIndicator
        size={60}
        className="text-yellow-400"
        animating={true}
      />
    </View>
  );
};

export default MainLoader;
