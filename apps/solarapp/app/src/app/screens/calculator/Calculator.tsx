import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ScrollLayout from '../../components/layouts/ScrollLayout';
import { gstyles, themeConfig } from '../../globalStyles';
import { DeviceType } from '@solarapp/lib';
import PanelCarbonCredits from './calculators/PanelCarbonCredits';
import GeyserCarbonCredits from './calculators/GeyserCarbonCredits';
import { useFocusEffect } from '@react-navigation/native';

const Calculator = ({ navigation, route }) => {
  const [isFocused, setIsFocused] = useState(true);
  const [type, setType] = useState<DeviceType>('solar panel');

  const onChangeType = useCallback(
    (deviceType: DeviceType) => {
      setType(deviceType);
    },
    [type]
  );

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [isFocused])
  );

  useEffect(() => {
    if (route?.params && route?.params?.selectedCoordinates)
      if (isFocused) {
        // setDevice({
        //   ...newDevice,
        //   locationObject: route?.params?.selectedCoordinates,
        // });
      }
  }, [isFocused]);

  return (
    <View style={[gstyles.flex1]}>
      <View style={{ flex: 1 }}>
        <ScrollLayout styles={[gstyles.flex1]}>
          {type === 'solar panel' && (
            <PanelCarbonCredits navigation={navigation} route={route} />
          )}
          {type === 'solar geyser' && (
            <GeyserCarbonCredits navigation={navigation} route={route} />
          )}
        </ScrollLayout>
      </View>
      <View
        style={{
          height: 80,
          backgroundColor: themeConfig.colors.background,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={() => onChangeType('solar panel')}
          style={[
            styles.tabItem,
            {
              backgroundColor:
                type === 'solar panel'
                  ? themeConfig.colors.primary
                  : themeConfig.colors.onSurface,
            },
          ]}
        >
          <Text style={styles.buttonText}>Solar Panel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeType('solar geyser')}
          style={[
            styles.tabItem,
            {
              backgroundColor:
                type === 'solar geyser'
                  ? themeConfig.colors.primary
                  : themeConfig.colors.onSurface,
            },
          ]}
        >
          <Text style={styles.buttonText}>Solar Geyser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
