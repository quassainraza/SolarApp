import { Dispatch, createContext } from 'react';

export const SummaryCtx = createContext<
  [any, Dispatch<any>, boolean, () => Promise<void>] | []
>([]);
