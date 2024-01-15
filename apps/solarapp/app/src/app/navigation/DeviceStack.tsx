import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterDevice from '../screens/root/devices/RegisterDevice';
import ManageDevice from '../screens/root/devices/ManageDevice';
import DeviceList from '../screens/root/devices/DeviceList';
import MapView from '../components/atoms/MapView';
import PVForecast from '../screens/root/devices/PVForecast';

const { Navigator, Screen } = createNativeStackNavigator();

const DeviceStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="deviceList" component={DeviceList} />
      <Screen
        name="registerDevice"
        component={RegisterDevice}
        options={{
          presentation: 'modal',
          title: 'Register',
        }}
      />
      <Screen
        name="manageDevice"
        component={ManageDevice}
        options={{ presentation: 'modal', title: 'Manage Device' }}
      />
      <Screen
        name="mapView"
        component={MapView}
        options={{
          presentation: 'modal',
          title: 'Select Location',
        }}
      />
      <Screen
        name="pvForecast"
        component={PVForecast}
        options={{
          presentation: 'modal',
          title: 'PVForcast',
        }}
      />
    </Navigator>
  );
};

export default DeviceStack;
