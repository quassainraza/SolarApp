import {
  Text,
  RefreshControl,
  FlatList,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { getAllDevices } from '../../../controllers/device';
import { UserCtx } from '../../../state/contexts/User';
import { DevicesCtx } from '../../../state/contexts/Device';
import { gstyles } from '../../../globalStyles';
import { errorHandler } from '../../../utils/utils';
import DeviceCard from '../../../components/molecules/DeviceCard';
import FAB from '../../../components/atoms/FAB';
import { IDevice } from '@solarapp/lib';
import { getPVForcastData } from '../../../controllers/pvForcast';
import LoaderWrapper from '../../../components/atoms/LoaderWrapper';

const DeviceList = ({ navigation }) => {
  const [activeUser] = useContext(UserCtx);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userDevices, setUserDevices] = useContext(DevicesCtx);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const response = await getAllDevices(activeUser);
      setIsRefreshing(false);
      if (response.data && response.data?.response && setUserDevices) {
        setUserDevices(response.data?.response);
      }
    } catch (error) {
      setIsRefreshing(false);
      errorHandler({ message: 'Could not fetch devices' });
    }
  }, [activeUser]);

  const onRefresh = useCallback(() => {
    getData().catch((_) => {});
  }, []);

  const onCreateDevice = useCallback(() => {
    navigation.navigate('registerDevice');
  }, []);

  const onShowPVForcast = useCallback(async (item: IDevice) => {
    try {
      setIsLoading(true);
      const forcast = await getPVForcastData(item);
      setIsLoading(false);
      navigation.navigate('pvForecast', { forcast, item });
    } catch (error) {
      setIsLoading(false);
      errorHandler({ message: 'Could not load Forcast' });
    }
  }, []);
  const onEditDevice = useCallback((item: IDevice) => {
    navigation.navigate('manageDevice', item);
  }, []);

  return (
    <View style={[gstyles.hFull, { backgroundColor: 'white' }]}>
      <LoaderWrapper isLoading={isLoading}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          style={gstyles.flex1}
          showsHorizontalScrollIndicator={false}
        >
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          <Text style={[gstyles.heading1, { margin: 15 }]}>Your Devices</Text>
          {userDevices.length > 0 && (
            <FlatList
              scrollEnabled={false}
              data={userDevices}
              keyExtractor={({ id }, index) => `${id}_${index}`}
              renderItem={({ item }) => (
                <DeviceCard
                  thisDevice={item}
                  onEdit={() => onEditDevice(item)}
                  onShowPVForecast={() => onShowPVForcast(item)}
                />
              )}
            />
          )}
        </ScrollView>
        <SafeAreaView>
          <FAB icon={'plus'} onPress={onCreateDevice} />
        </SafeAreaView>
      </LoaderWrapper>
    </View>
  );
};

export default DeviceList;
