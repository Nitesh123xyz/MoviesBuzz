import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const useProtectedAction = () => {
  const navigation = useNavigation();

  const performAction = actionCallback => {
    const user = auth().currentUser;

    if (user) {
      actionCallback();
    } else {
      Alert.alert(
        'Login Required',
        'Please login to add movies to your list.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('Login') },
        ],
        { cancelable: true },
      );
    }
  };

  return performAction;
};
