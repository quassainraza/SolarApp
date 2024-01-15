import { IUser } from '@solarapp/lib';
import { createContext } from 'react';

export const UserCtx = createContext<
  [IUser, React.Dispatch<React.SetStateAction<IUser>>] | []
>([]);

