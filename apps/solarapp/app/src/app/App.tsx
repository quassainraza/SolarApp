import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import AppStack from './navigation/AppStack';
import { themeConfig } from './globalStyles';
import UserProvider from './state/providers/UserProvider';
import LoaderWrapper from './components/atoms/LoaderWrapper';
import GeoLocation from '@react-native-community/geolocation';
import { enableLatestRenderer } from 'react-native-maps';
import { errorHandler } from './utils/utils';
import { StyleSheet, View } from 'react-native';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GeoLocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always',
      enableBackgroundLocationUpdates: true,
      locationProvider: 'auto',
    });

    GeoLocation.requestAuthorization(
      () => {
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        errorHandler({
          message:
            'Marillionex could not read your location which is essential for registering you solar devices with our database',
        });
      }
    );

    enableLatestRenderer();
  }, []);

  return (
    <View style={styles.appContainer}>
      <LoaderWrapper isLoading={isLoading}>
        <PaperProvider theme={themeConfig}>
          <GluestackUIProvider config={config}>
            <NavigationContainer>
              <UserProvider>
                <AppStack />
              </UserProvider>
            </NavigationContainer>
          </GluestackUIProvider>
        </PaperProvider>
      </LoaderWrapper>
    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});
