import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/types/RootStackParamList';
import { useNavigation } from '@react-navigation/native';
// ------------------------------------------

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
// ------------------------------------------

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const handleSignUp = async () => {
    // Basic validation
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );

      const uid = userCredential.user.uid;

      await firestore().collection('users').doc(uid).set({
        email: email.toLowerCase().trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
        uid: uid,
      });

      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'message' in error
      ) {
        if (error.code === 'auth/configuration-not-found') {
          Alert.alert(
            'Config Error',
            'Please enable Email/Password in Firebase Console.',
          );
        } else if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        } else {
        }
        Alert.alert('Error', 'Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 justify-center px-6">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-slate-800">
            Create Account
          </Text>
          <Text className="text-slate-500 mt-2">Sign up to get started</Text>
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-slate-600 mb-2 ml-1 font-medium">
              Email Address
            </Text>
            <TextInput
              className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-800 shadow-sm"
              placeholder="name@example.com"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-slate-600 mb-2 ml-1 font-medium">
              Password
            </Text>
            <TextInput
              className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-800 shadow-sm"
              placeholder="Create a password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSignUp}
          disabled={loading}
          className={`mt-8 h-16 rounded-2xl flex-row justify-center items-center ${
            loading ? 'bg-blue-400' : 'bg-blue-600'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-semibold">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-slate-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-blue-600 font-bold">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
