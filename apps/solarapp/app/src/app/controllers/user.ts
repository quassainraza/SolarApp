import { IUser } from '@solarapp/lib';
import { axiosInstance, errorHandler, getErrorMessage } from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (user: IUser) => {
  try {
    const response = await axiosInstance().post('/user', user);
    return response.data;
  } catch (error) {
    console.log(error);

    errorHandler({ message: getErrorMessage(error).message }, false);
  }
};

export const loginUser = async (user: IUser): Promise<IUser> => {
  try {
    const response = await axiosInstance().post('/user/login', user);
    return response.data;
  } catch (error) {
    console.log(error);
    errorHandler({ message: getErrorMessage(error).message }, false);
    return null;
  }
};

export const logout = async (callback: () => void) => {
  try {
    await AsyncStorage.clear();
    return callback();
  } catch (error) {
    errorHandler({ message: 'Could not log out' });
  }
};

export const updateUser = async (user: IUser) => {
  try {
    const response = await axiosInstance().put('/user/update', user);
    return response.data;
  } catch (error) {
    errorHandler(error?.message, true);
  }
};