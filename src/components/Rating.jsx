import { StyleSheet, View } from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
const Rating = ({ RatingPer = 0, Size = 25 }) => {
  const percentValue = Math.round((RatingPer / 10) * 100);
  return (
    <View className="absolute bottom-2 right-1">
      <CircularProgress
        value={percentValue}
        radius={Size}
        showProgressValue={false}
        titleColor="white"
        title={`${RatingPer.toFixed(1)}`}
        titleStyle={{ fontSize: 10, fontWeight: 'bold' }}
        activeStrokeColor="#CFECF7"
        activeStrokeWidth={5}
        duration={900}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
