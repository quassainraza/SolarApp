import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Map, { Marker } from 'react-native-maps';
import { IDevice } from '@solarapp/lib';
import { gstyles } from '../../globalStyles';

interface Props {
  devices?: IDevice[];
  onPress?: () => void;
}

const DevicesMap = ({ devices, onPress }: Props) => {
  return (
    <View style={gstyles.gap1}>
      <Text style={gstyles.bigSupText}>
        {devices?.length
          ? `You have ${devices.length} devices`
          : 'Register device to view on Map'}
      </Text>
      <Pressable onPress={onPress ? onPress : () => {}}>
        <View>
          <Map mapType="hybrid" style={styles.container}>
            {devices &&
              devices.map((device) => (
                <Marker
                  key={device.id}
                  coordinate={{ latitude: 10, longitude: 122 }}
                  title={device.title}
                  description={device.type}
                />
              ))}
          </Map>
        </View>
      </Pressable>
    </View>
  );
};

export default DevicesMap;

const styles = StyleSheet.create({
  container: {
    height: 500,
    borderRadius: 10,
  },
});
