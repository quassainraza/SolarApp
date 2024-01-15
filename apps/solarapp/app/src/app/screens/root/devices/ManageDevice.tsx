import React, { useCallback, useContext, useEffect, useState } from 'react';
import ScrollLayout from '../../../components/layouts/ScrollLayout';
import TextField from '../../../components/atoms/TextField';
import { gstyles } from '../../../globalStyles';
import RadioGroup from '../../../components/molecules/RadioGroup';
import { Button } from 'react-native-paper';
import { Text } from 'react-native';
import { IDevice, ISolarGeyser, ISolarPanel } from '@solarapp/lib';
import { errorHandler, populateProperties, ridNaN } from '../../../utils/utils';
import { RadioProps } from '../../../components/atoms/Radio';
import { useFocusEffect } from '@react-navigation/native';
import { getAllDevices, updateDevice } from '../../../controllers/device';
import { DevicesCtx } from '../../../state/contexts/Device';
import { UserCtx } from '../../../state/contexts/User';
import LoaderWrapper from '../../../components/atoms/LoaderWrapper';

const ManageDevice = ({ navigation, route }) => {
  const [activeUser] = useContext(UserCtx);
  const [isLoading, setisLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [updatedDevice, setUpdatedDevice] = useState<IDevice>(route?.params);
  const [, setUserDevices] = useContext(DevicesCtx);

  const onSelectLocation = useCallback(() => {
    navigation.navigate('mapView', {
      coordinates: updatedDevice.locationObject,
      previousScreen: 'manageDevice',
    });
  }, [navigation, updatedDevice]);

  const getData = useCallback(async () => {
    try {
      const response = await getAllDevices(activeUser);

      if (response.data && response.data?.response && setUserDevices) {
        setUserDevices(response.data?.response);
      }
    } catch (error) {
      errorHandler({ message: 'Could not fetch devices' });
    }
  }, [activeUser]);

  const onUpdateDevice = useCallback(async () => {
    setisLoading(true);
    await updateDevice(updatedDevice);
    await getData();
    setTimeout(() => {
      setisLoading(false);
      navigation.goBack();
    }, 2000);
  }, [updatedDevice]);

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
        setUpdatedDevice({
          ...updatedDevice,
          locationObject: route?.params?.selectedCoordinates,
        });
      }
  }, [isFocused]);

  const onSelectedDeviceType = useCallback(
    (value: RadioProps) => {
      if (value.value === 'solar geyser' || value.value === 'solar panel') {
        setUpdatedDevice({
          ...updatedDevice,
          type: value.value,
          deviceSpecs: { ...populateProperties(value.value) },
        });
      }
    },
    [updatedDevice, setUpdatedDevice]
  );

  return (
    <LoaderWrapper isLoading={isLoading}>
      <ScrollLayout isSafeArea styles={[gstyles.pad1, gstyles.gap1]}>
        <Text style={gstyles.heading1}>Register Device</Text>
        <TextField
          value={updatedDevice?.title}
          onChange={(e) => {
            setUpdatedDevice({
              ...updatedDevice,
              title: e,
            });
          }}
          label="Title"
        />
        <RadioGroup
          activeOption={updatedDevice?.type}
          style={[gstyles.gap1]}
          onSelectOption={onSelectedDeviceType}
          options={[
            { label: 'Solar Panel', value: 'solar panel' },
            { label: 'Solar Geyser', value: 'solar geyser' },
          ]}
        />
        <TextField
          value={updatedDevice.serialNo}
          onChange={(e) => {
            setUpdatedDevice({
              ...updatedDevice,
              serialNo: e,
            });
          }}
          label="Serial Number"
        />

        {updatedDevice.type === 'solar panel' &&
          (updatedDevice.deviceSpecs as ISolarPanel) && (
            <>
              <TextField
                value={(
                  updatedDevice.deviceSpecs as ISolarPanel
                )?.powerOutput?.toString()}
                onChange={(e) => {
                  try {
                    setUpdatedDevice({
                      ...updatedDevice,
                      deviceSpecs: {
                        ...updatedDevice.deviceSpecs,
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
                value={(
                  updatedDevice.deviceSpecs as ISolarPanel
                )?.size?.toString()}
                onChange={(e) => {
                  try {
                    setUpdatedDevice({
                      ...updatedDevice,
                      deviceSpecs: {
                        ...updatedDevice.deviceSpecs,
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
        {updatedDevice.type === 'solar geyser' &&
          (updatedDevice.deviceSpecs as ISolarGeyser) && (
            <>
              <TextField
                value={(
                  updatedDevice.deviceSpecs as ISolarGeyser
                )?.capacity?.toString()}
                onChange={(e) => {
                  try {
                    setUpdatedDevice({
                      ...updatedDevice,
                      deviceSpecs: {
                        ...updatedDevice.deviceSpecs,
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
                  updatedDevice.deviceSpecs as ISolarGeyser
                )?.occupants?.toString()}
                onChange={(e) => {
                  try {
                    setUpdatedDevice({
                      ...updatedDevice,
                      deviceSpecs: {
                        ...updatedDevice.deviceSpecs,
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
          value={updatedDevice.comments}
          onChange={(e) => {
            setUpdatedDevice({
              ...updatedDevice,
              comments: e,
            });
          }}
          label="Comments"
        />

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
          onPress={onUpdateDevice}
        >
          Update Device
        </Button>
      </ScrollLayout>
    </LoaderWrapper>
  );
};

export default ManageDevice;
