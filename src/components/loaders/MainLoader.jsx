import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const MainLoader = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={90} color="#facc15" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainLoader;
