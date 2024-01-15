import { IDevice, IUser } from '@solarapp/lib';
import { axiosInstance, errorHandler } from '../utils/utils';
import { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { LatLng } from 'react-native-maps';

export const registerDevice = (
  user: IUser,
  device: IDevice,
  openMap?: () => void
) => {
  if (!user?.id) {
    errorHandler({ message: 'User not logged in' });
    return new Promise<AxiosResponse<any, any>>(() => false);
  }
  if (!device?.title || !device.serialNo) {
    errorHandler({ message: 'Device Details Incomplete' });
    return new Promise<AxiosResponse<any, any>>(() => false);
  }

  if (!Object.values(device.deviceSpecs).reduce((a, b) => a && b)) {
    errorHandler({ message: 'Device specifications missing' });
    return new Promise<AxiosResponse<any, any>>(() => false);
  }

  if (
    !device.locationObject ||
    (!(device.locationObject as LatLng).latitude &&
      !(device.locationObject as LatLng).longitude)
  ) {
    Alert.alert(
      'Attention',
      "You haven't selected any location. Please select one?",
      [
        {
          text: 'Select Location',
          onPress: openMap,
        },
      ]
    );
  } else {
    return axiosInstance().post('/device', {
      userId: user.id,
      device: device,
    });
  }
};

export const getAllDevices = (user: IUser) => {
  if (!user?.id) {
    errorHandler({ message: 'User not logged in' });
    return new Promise<AxiosResponse<any, any>>(() => false);
  }
  return axiosInstance().get(`/device/${user.id}`);
};

export const deleteDeviceById = (device: IDevice) => {
  if (!device?.id) {
    errorHandler({ message: 'Device ID missing' });
    return new Promise<AxiosResponse<any, any>>(() => false);
  }
  return axiosInstance().delete(`/device/${device.id}`);
};

export const updateDevice = (device: IDevice) => {
  if (!device.id) {
    errorHandler({ message: 'Device ID missing' });
    return new Promise<AxiosResponse<any, any>>(() => false);
  }

  if (!Object.values(device.deviceSpecs).reduce((a, b) => a && b)) {
    errorHandler({ message: 'Device specifications missing' });
    return new Promise<AxiosResponse<any, any>>(() => false);
  }
  return axiosInstance().put(`/device/${device.id}`, { device });
};
