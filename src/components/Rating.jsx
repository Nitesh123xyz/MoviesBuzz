import { StyleSheet, View } from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
const Rating = ({ RatingPer = 0, Size = 25 }) => {
  const percentValue = Math.round((RatingPer / 10) * 100);
  return (
    <View className="absolute bottom-3 right-2">
      <CircularProgress
        value={percentValue}
        radius={Size}
        showProgressValue={false}
        titleColor={'white'}
        progressValueColor={'#fff'}
        title={`${RatingPer.toFixed(1)}`}
        titleStyle={{ fontSize: 8, fontWeight: 'bold' }}
        activeStrokeColor="#FFEB3B"
        activeStrokeWidth={5}
        duration={900}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
