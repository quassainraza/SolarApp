import React, { useCallback, useContext, useEffect, useState } from 'react';
import ScrollLayout from '../../../components/layouts/ScrollLayout';
import TextField from '../../../components/atoms/TextField';
import { gstyles } from '../../../globalStyles';
import RadioGroup from '../../../components/molecules/RadioGroup';
import { RadioProps } from '../../../components/atoms/Radio';
import { Button } from 'react-native-paper';
import { DevicesCtx } from '../../../state/contexts/Device';
import { Alert, Text } from 'react-native';
import { IDevice, ISolarGeyser, ISolarPanel } from '@solarapp/lib';
import { errorHandler, populateProperties, ridNaN } from '../../../utils/utils';
import { registerDevice } from '../../../controllers/device';
import { UserCtx } from '../../../state/contexts/User';
import { useFocusEffect } from '@react-navigation/native';
import { DeviceOptions } from '../../../constants';

const RegisterDevice = ({ navigation, route }) => {
  const [isFocused, setIsFocused] = useState(true);
  const [newDevice, setNewDevice] = useState<IDevice>({
    serialNo: '',
    comments: '',
    locationObject: {},
    title: '',
    type: 'solar panel',
    deviceSpecs: {
      size: '',
      powerOutput: '',
    },
  });
  const [userDevices, setUserDevices] = useContext(DevicesCtx);
  const [activeUser] = useContext(UserCtx);

  const onSelectLocation = useCallback(() => {
    if (!newDevice.title || !newDevice.serialNo) {
      Alert.alert('Sorry', 'You need to add details for you device first');
    } else {
      navigation.navigate('mapView', {
        previousScreen: 'registerDevice',
        coordinates: newDevice.locationObject,
      });
    }
  }, [navigation, newDevice]);

  const onSelectedDeviceType = useCallback(
    (value: RadioProps) => {
      if (value.value === 'solar geyser' || value.value === 'solar panel') {
        setNewDevice({
          ...newDevice,
          type: value.value,
          deviceSpecs: { ...populateProperties(value.value) },
        });
      }
    },
    [newDevice, setNewDevice]
  );

  const onRegisterDevice = useCallback(async () => {
    try {
      const response = await registerDevice(
        activeUser,
        {
          ...newDevice,
          locationObject: route?.params?.selectedCoordinates,
        },
        onSelectLocation
      );

      if (response.data && response.data?.response) {
        setUserDevices([response.data?.response, ...userDevices]);
        navigation.goBack();
      }
    } catch (error) {
      errorHandler({ error });
    }
  }, [newDevice]);

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
        setNewDevice({
          ...newDevice,
          locationObject: route?.params?.selectedCoordinates,
        });
      }
  }, [isFocused]);

  return (
    <ScrollLayout isSafeArea styles={[gstyles.pad1, gstyles.gap1]}>
      <Text style={gstyles.heading1}>Register Device</Text>
      <TextField
        value={newDevice?.title}
        onChange={(e) => {
          setNewDevice({
            ...newDevice,
            title: e,
          });
        }}
        label="Title"
      />
      <RadioGroup
        activeOption={newDevice?.type}
        style={[gstyles.gap1]}
        onSelectOption={onSelectedDeviceType}
        options={DeviceOptions}
      />
      <TextField
        value={newDevice.serialNo}
        onChange={(e) => {
          setNewDevice({
            ...newDevice,
            serialNo: e,
          });
        }}
        label="Serial Number"
      />

      {newDevice.type === 'solar panel' &&
        (newDevice.deviceSpecs as ISolarPanel) && (
          <>
            <TextField
              value={(
                newDevice.deviceSpecs as ISolarPanel
              )?.powerOutput?.toString()}
              onChange={(e) => {
                try {
                  setNewDevice({
                    ...newDevice,
                    deviceSpecs: {
                      ...newDevice.deviceSpecs,
                      powerOutput: ridNaN(e),
                    },
                  });
                } catch (error) {
                  errorHandler({ error });
                }
              }}
              label="Power Output"
              keyboardTypeOptions="number-pad"
            />
            <TextField
              value={(newDevice.deviceSpecs as ISolarPanel)?.size?.toString()}
              onChange={(e) => {
                try {
                  setNewDevice({
                    ...newDevice,
                    deviceSpecs: {
                      ...newDevice.deviceSpecs,
                      size: ridNaN(e),
                    },
                  });
                } catch (error) {
                  errorHandler({ error });
                }
              }}
              label="Size"
              keyboardTypeOptions="number-pad"
            />
          </>
        )}
      {newDevice.type === 'solar geyser' &&
        (newDevice.deviceSpecs as ISolarGeyser) && (
          <>
            <TextField
              value={(
                newDevice.deviceSpecs as ISolarGeyser
              )?.capacity?.toString()}
              onChange={(e) => {
                try {
                  setNewDevice({
                    ...newDevice,
                    deviceSpecs: {
                      ...newDevice.deviceSpecs,
                      capacity: ridNaN(e),
                    },
                  });
                } catch (error) {
                  errorHandler({ error });
                }
              }}
              label="Geyser Capacity"
              keyboardTypeOptions="number-pad"
            />
            <TextField
              value={(
                newDevice.deviceSpecs as ISolarGeyser
              )?.occupants?.toString()}
              onChange={(e) => {
                try {
                  setNewDevice({
                    ...newDevice,
                    deviceSpecs: {
                      ...newDevice.deviceSpecs,
                      occupants: ridNaN(e),
                    },
                  });
                } catch (error) {
                  errorHandler({ error });
                }
              }}
              label="Number of Occupants"
              keyboardTypeOptions="number-pad"
            />
          </>
        )}
      <TextField
        value={newDevice.comments}
        onChange={(e) => {
          setNewDevice({
            ...newDevice,
            comments: e,
          });
        }}
        label="Comments"
      />
      <Button mode="outlined" style={gstyles.button} onPress={onSelectLocation}>
        Select Location
      </Button>
      <Button
        mode="contained"
        textColor="white"
        style={gstyles.button}
        onPress={onRegisterDevice}
      >
        Register Device
      </Button>
    </ScrollLayout>
  );
};

export default RegisterDevice;
