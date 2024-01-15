import { View, Text, FlatList } from 'react-native';
import React from 'react';
import DeviceCredits from '../molecules/DeviceCredits';
import { gstyles } from '../../globalStyles';
import { IDevice } from '@solarapp/lib';

const TopDevices = ({ devices }: { devices: IDevice[] }) => {
  if (!devices) {
    return <View />;
  }
  return (
    <View style={[gstyles.padY, gstyles.gap1]}>
      <Text style={gstyles.bigSupText}>Lowest CO2 Emission Devices</Text>
      {devices.length > 0 && (
        <FlatList
          contentContainerStyle={gstyles.gap05}
          scrollEnabled={false}
          data={devices.slice(0, 3)}
          keyExtractor={(item, index) => item.id + item.serialNo + index}
          renderItem={({ item }) => <DeviceCredits {...item} />}
        />
      )}
    </View>
  );
};

export default TopDevices;
