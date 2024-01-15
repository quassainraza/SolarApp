import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

const { Navigator, Screen } = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="login" component={Login} />
      <Screen name="register" component={Register} />
    </Navigator>
  );
};

export default AuthStack;
