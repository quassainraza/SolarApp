import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountInfo from '../screens/account/AccountInfo';
import AccountInfoUpdater from '../screens/account/AccountInfoUpdater';

const { Navigator, Screen } = createNativeStackNavigator();

const AccountStack = ({ navigation }) => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="accountInfo" component={AccountInfo} />
      <Screen
        name="accountInfoUpdater"
        component={AccountInfoUpdater}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Navigator>
  );
};

export default AccountStack;
