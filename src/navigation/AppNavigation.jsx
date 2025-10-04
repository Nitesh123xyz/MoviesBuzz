import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import PersonScreen from '../screens/PersonScreen';
const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#262626' },
          gestureEnabled: true,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MovieDetails" component={DetailsScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
