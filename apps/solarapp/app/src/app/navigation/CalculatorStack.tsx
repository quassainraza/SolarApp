import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from '../screens/calculator/Calculator';
import MapView from '../components/atoms/MapView';
const { Navigator, Screen } = createNativeStackNavigator();

const CalculatorStack = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={Calculator} name="calculator" />
      <Screen
        component={MapView}
        name="mapView"
        options={{
          presentation: 'modal',
        }}
      />
    </Navigator>
  );
};

export default CalculatorStack;
