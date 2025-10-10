import React from 'react';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/store/store';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

export default App;
