import React, { useState } from 'react';
import { IUser } from '@solarapp/lib';
import { UserCtx } from '../contexts/User';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>({
    email: '',
    firstname: '',
    password: '',
    avatar: '',
    lastname: '',
    telephone: '',
  });

  return (
    <UserCtx.Provider value={[user, setUser]}>{children}</UserCtx.Provider>
  );
};

export default UserProvider;
