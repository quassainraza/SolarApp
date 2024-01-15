import { IUser } from '@solarapp/lib';
import { axiosInstance } from '../utils/utils';

export const getSummary = async (user: IUser) => {
  if (!user?.id) return;
  const response = await axiosInstance().get(`/user/dashboard/${user.id}`);
  return response.data;
};
