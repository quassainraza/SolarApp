import { IDevice } from '@solarapp/lib';
import { axiosInstance } from '../utils/utils';

export const getPVForcastData = async (device: IDevice) => {
  return (await axiosInstance().post('/forecast', { device })).data;
};
