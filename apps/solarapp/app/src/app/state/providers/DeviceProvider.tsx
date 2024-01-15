import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IDevice } from '@solarapp/lib';
import { DevicesCtx } from '../contexts/Device';
import { UserCtx } from '../contexts/User';
import { getAllDevices } from '../../controllers/device';
import { errorHandler } from '../../utils/utils';
import LoaderWrapper from '../../components/atoms/LoaderWrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const DeviceProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeUser] = useContext(UserCtx);
  const [userDevices, setUserDevices] = useState<IDevice[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await getAllDevices(activeUser);
      if (response.data && response.data?.response) {
        setUserDevices(response.data?.response);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorHandler({ message: 'Could not fetch devices, try again later' });
    }
  }, [activeUser]);

  useEffect(() => {
    if (activeUser?.email) {
      getData()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [activeUser]);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <DevicesCtx.Provider value={[userDevices, setUserDevices]}>
        {children}
      </DevicesCtx.Provider>
    </LoaderWrapper>
  );
};

export default DeviceProvider;
