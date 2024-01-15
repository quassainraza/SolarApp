import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SummaryCtx } from '../contexts/Summary';
import { getSummary } from '../../controllers/summary';
import { UserCtx } from '../contexts/User';
import LoaderWrapper from '../../components/atoms/LoaderWrapper';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SummaryProvider = ({ children }: Props) => {
  const [user] = useContext(UserCtx);
  const [summary, setSummary] = useState<any>();
  const [isReloading, setIsReloading] = useState(false);
  const [isLoadingForFirstTime, setIsLoadingForFirstTime] = useState(true);

  const reloadSummary = useCallback(async () => {
    try {
      setIsReloading(true);
      const response = await getSummary(user);
      if (response) {
        setSummary(response);
      }
      setIsReloading(false);
    } catch (error) {
      setIsReloading(false);
    }
  }, [summary]);

  useEffect(() => {
    setIsLoadingForFirstTime(true);
    if (user?.id) {
      getSummary(user)
        .then((val) => {
          setSummary(val);
          setIsLoadingForFirstTime(false);
        })
        .catch((err) => {
          setIsLoadingForFirstTime(false);
        });
    }
  }, [user]);

  return (
    <LoaderWrapper isLoading={isLoadingForFirstTime}>
      <SummaryCtx.Provider
        value={[summary, setSummary, isReloading, reloadSummary]}
      >
        {children}
      </SummaryCtx.Provider>
    </LoaderWrapper>
  );
};

export default SummaryProvider;
