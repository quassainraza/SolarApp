import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScrollLayout from '../../../components/layouts/ScrollLayout';
import { gstyles } from '../../../globalStyles';
import { IDevice } from '@solarapp/lib';
import { Card } from 'react-native-paper';

const PVForecast = ({ navigation, route }) => {
  const device = route?.params?.item as IDevice;
  const forcast = route?.params?.forcast?.forcast as any[];
  return (
    <ScrollLayout
      styles={[gstyles.gap05, { paddingBottom: 100, paddingHorizontal: 20 }]}
    >
      <View style={[gstyles.pad1, { gap: 4 }]}>
        <Text style={gstyles.heading1}>PV Forcast</Text>
        <Text style={styles.deviceName}>{device.title}</Text>
        <Text style={styles.deviceType}>{device.type}</Text>
      </View>
      <FlatList
        overScrollMode="always"
        scrollEnabled={false}
        data={forcast}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.forecastContainer}>
            <Card style={[gstyles.pad1]}>
              <View
                style={[
                  gstyles.wFull,
                  { justifyContent: 'space-between', flexDirection: 'row' },
                ]}
              >
                <Text style={{ fontSize: 20, color: 'white' }}>
                  Day: {item.day}
                </Text>
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  {new Date().getDate()}/{new Date().getMonth()}/
                  {new Date().getFullYear()}
                </Text>
              </View>
              <View style={{ height: 10 }} />
              <View
                style={[
                  gstyles.wFull,
                  { justifyContent: 'space-between', flexDirection: 'row' },
                ]}
              >
                <Text
                  style={{ fontSize: 17, color: 'white', fontWeight: '600' }}
                >
                  PV {item.pv_generation}
                </Text>
                <Text
                  style={{ fontSize: 17, color: 'white', fontWeight: '600' }}
                >
                  {item.direct_normal_irradiance}
                </Text>
              </View>
            </Card>
          </View>
        )}
        keyExtractor={(item, index) => item?.day}
      />
    </ScrollLayout>
  );
};

export default PVForecast;

const styles = StyleSheet.create({
  deviceName: {
    fontSize: 20,
    fontWeight: '600',
  },
  deviceType: {
    fontSize: 18,
    opacity: 0.5,
  },
  forecastContainer: {
    flex: 1,
    paddingVertical: 10,
  },
});
