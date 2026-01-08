import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      // Firebase Authentication Login
      await auth().signInWithEmailAndPassword(
        email.trim().toLowerCase(),
        password,
      );

      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to your Home/Watchlist screen here
    } catch (error) {
      console.log('Login Error:', error.code, error.message);

      // Better error messages for the user
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert(
          'Invalid Credentials',
          'The email or password you entered is incorrect.',
        );
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid.');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-10">
          <Text className="text-3xl font-bold text-slate-800">
            Welcome Back
          </Text>
          <Text className="text-slate-500 mt-2">
            Log in to manage your watchlist
          </Text>
        </View>

        {/* Input Fields */}
        <View className="space-y-4">
          <View>
            <Text className="text-slate-600 mb-2 ml-1 font-medium">
              Email Address
            </Text>
            <TextInput
              className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-800 shadow-sm"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className={`mt-8 h-16 rounded-2xl flex-row justify-center items-center ${
            loading ? 'bg-blue-400' : 'bg-blue-600'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-semibold">Log In</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-6 flex-row justify-center">
          <Text className="text-slate-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-blue-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
