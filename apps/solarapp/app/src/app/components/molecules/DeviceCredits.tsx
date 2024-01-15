import { Text, View } from 'react-native';
import React from 'react';
import Card from '../atoms/Card';
import { gstyles } from '../../globalStyles';
import { IDevice } from '@solarapp/lib';
import { compactNumber } from '../../utils/utils';

const DeviceCredits = (device: IDevice) => {
  // const credits = ((device as any)?.credits as any[]).map((a) => a.amount);
  // credits.reduce((a, b) => a + b);
  return (
    <Card style={[gstyles.pad1, gstyles.rowCenter]}>
      <View>
        <Text style={gstyles.bigSupText}>{device.title}</Text>
        <Text style={gstyles.bigSubText}>{device.type}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={gstyles.bigText}>
          {compactNumber((device as any)?.credits)}
        </Text>
        <Text>Carbon Credits</Text>
      </View>
    </Card>
  );
};

export default DeviceCredits;
