import axios from 'axios';
import { Alert, Platform } from 'react-native';
import { DeviceType, ISolarGeyser, ISolarPanel } from '@solarapp/lib';
import { SOLAR_API } from '../constants';

export const getPlatform = () => {
  return Platform.OS;
};

export const axiosInstance = () => {
  return axios.create({
    baseURL: SOLAR_API,
  });
};

export const getErrorMessage = ({ response }) => {
  return JSON.parse(response?.request['_response']) as {
    statusCode: number;
    error: string;
    message: string;
  };
};

export const randomColor = () => {
  const colors = ['purple', 'red', 'orange'];
  return colors.at((Math.random() * 100) % colors.length);
};

export const errorHandler = (error: any, showAlert: boolean = true) => {
  if (error?.message && showAlert) Alert.alert(error?.message);
  console.log(error);
};

export const ridNaN = (num: string) => {
  return Number.isNaN(parseFloat(num)) ? '' : parseFloat(num);
};

export const populateProperties = (type: DeviceType) => {
  if (type === 'solar panel') {
    return {
      powerOutput: '',
      size: '',
    } as ISolarPanel;
  }
  if (type === 'solar geyser') {
    return {
      capacity: '',
      occupants: '',
    } as ISolarGeyser;
  }
};

export const compactNumber = (num: number) => {
  if (num > 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num < 1000) {
    return num.toFixed(2);
  }else{
    return num
  }
};