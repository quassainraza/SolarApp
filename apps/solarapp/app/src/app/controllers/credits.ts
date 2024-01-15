import { IDevice } from '@solarapp/lib';
import { axiosInstance } from '../utils/utils';

export const calculateCredits = async (device: IDevice) => {
  return axiosInstance().post('/credits/calculate', { device });
};
