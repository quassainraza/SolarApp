import { View, Text, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { gstyles } from '../../../globalStyles';
import TextField from '../../../components/atoms/TextField';
import { IDevice, ISolarGeyser } from '@solarapp/lib';
import { LatLng } from 'react-native-maps';
import { errorHandler, ridNaN } from '../../../utils/utils';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { calculateCredits } from '../../../controllers/credits';
import LoaderWrapper from '../../../components/atoms/LoaderWrapper';

const GeyserCarbonCredits = ({ navigation, route }) => {
  const [isFocused, setIsFocused] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [device, setDevice] = useState<IDevice>({
    title: '',
    locationObject: {
      latitude: 33,
      longitude: 33,
    } as LatLng,
    type: 'solar geyser',
    comments: '',
    deviceSpecs: {
      occupants: '',
      capacity: '',
    },
  });

  const onCalculateResults = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await calculateCredits({
        ...device,
        locationObject: route?.params?.selectedCoordinates,
      });
      Alert.alert('Carbon Credits', JSON.stringify(response.data?.credits));
    } catch (error) {
      errorHandler({ message: 'An Error occured calculating credits' });
    }
    setIsLoading(false);
  }, [device]);

  const onSelectLocation = useCallback(() => {
    navigation.navigate('mapView', {
      previousScreen: 'calculator',
      coordinates: device.locationObject,
    });
  }, [device]);

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
        setDevice({
          locationObject: route?.params?.selectedCoordinates,
          ...device,
        });
      }
  }, [isFocused, route?.params]);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <View style={[gstyles.gap05, gstyles.pad1]}>
        <Text style={gstyles.heading1}>Solar Geyser</Text>
        <TextField
          value={device?.title}
          onChange={(e) => {
            setDevice({
              ...device,
              title: e,
            });
          }}
          label="Title"
        />
        <TextField
          value={device.serialNo}
          onChange={(e) => {
            setDevice({
              ...device,
              serialNo: e,
            });
          }}
          label="Serial Number"
        />
        <TextField
          value={(device.deviceSpecs as ISolarGeyser)?.capacity?.toString()}
          onChange={(e) => {
            try {
              setDevice({
                ...device,
                deviceSpecs: {
                  ...device.deviceSpecs,
                  capacity: ridNaN(e),
                },
              });
            } catch (error) {
              errorHandler({ error });
            }
          }}
          label="Capacity"
          keyboardTypeOptions="number-pad"
        />
        <TextField
          value={(device.deviceSpecs as ISolarGeyser)?.occupants?.toString()}
          onChange={(e) => {
            try {
              setDevice({
                ...device,
                deviceSpecs: {
                  ...device.deviceSpecs,
                  occupants: ridNaN(e),
                },
              });
            } catch (error) {
              errorHandler({ error });
            }
          }}
          label="No. of Occupants"
          keyboardTypeOptions="number-pad"
        />
        <Text style={{ opacity: 0.5 }}>
          {JSON.stringify(route?.params?.selectedCoordinates)}
        </Text>

        <View style={{ height: 20 }} />
        <Button
          mode="outlined"
          style={gstyles.button}
          onPress={onSelectLocation}
        >
          Select Location
        </Button>
        <Button
          mode="contained"
          textColor="white"
          style={gstyles.button}
          onPress={onCalculateResults}
        >
          Calculate
        </Button>
      </View>
    </LoaderWrapper>
  );
};

export default GeyserCarbonCredits;
