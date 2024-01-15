import { IDevice } from '@solarapp/lib';
import { createContext } from 'react';

export const DevicesCtx = createContext<
  [IDevice[], React.Dispatch<React.SetStateAction<IDevice[]>>] | []
>([]);
