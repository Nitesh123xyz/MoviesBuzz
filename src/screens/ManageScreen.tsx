import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MoviesScreen from './MoviesScreen';
import TvScreen from './TvScreen';
import Navbar from '../components/Navbar';

const ManageScreen = () => {
  const [step, setStep] = useState(1);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Navbar step={step} setStep={setStep} />

      <View style={{ flex: 1 }}>
        {step === 1 && <MoviesScreen />}
        {step === 2 && <TvScreen />}
      </View>
    </View>
  );
};

export default ManageScreen;
