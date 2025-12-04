import React from 'react';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
     <SafeAreaProvider style={{ flex: 1 }}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
