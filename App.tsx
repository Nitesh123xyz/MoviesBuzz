import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </>
  );
};

export default App;
