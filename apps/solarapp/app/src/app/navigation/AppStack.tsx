import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthStack from './AuthStack';
import RootDrawer from './RootDrawer';
import Splash from '../screens/Splash';

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="splash" component={Splash} />
      <Screen name="authentication" component={AuthStack} />
      <Screen name="root" component={RootDrawer} />
    </Navigator>
  );
};

export default AppStack;
