import React, { useCallback, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/root/Dashboard';
import DeviceStack from './DeviceStack';
import { TouchableOpacity } from 'react-native';
import Feature from 'react-native-vector-icons/Feather';
import { APPLE_BLUE, gstyles } from '../globalStyles';
import { logout } from '../controllers/user';
import { UserCtx } from '../state/contexts/User';
import CalculatorStack from './CalculatorStack';
import AccountStack from './AccountStack';
import SummaryProvider from '../state/providers/SummaryProvider';
import DeviceProvider from '../state/providers/DeviceProvider';

const { Navigator, Screen } = createDrawerNavigator();

const RootDrawer = ({ navigation }) => {
  const [, setUser] = useContext(UserCtx);

  const onLogout = useCallback(() => {
    logout(() => {
      setUser({
        email: '',
        password: '',
        firstname: '',
      });
      navigation.replace('authentication');
    });
  }, []);

  return (
    <SummaryProvider>
      <DeviceProvider>
        <Navigator
          backBehavior="history"
          screenOptions={{
            drawerActiveTintColor: 'red',

            headerRight: () => (
              <TouchableOpacity style={gstyles.padX05} onPress={onLogout}>
                <Feature name="log-out" size={20} color={APPLE_BLUE} />
              </TouchableOpacity>
            ),
          }}
        >
          <Screen
            name="dashboard"
            component={Dashboard}
            options={{ title: 'Dashboard' }}
          />
          <Screen
            name="devices"
            component={DeviceStack}
            options={{ title: 'My Device' }}
          />
          <Screen
            name="calculatorStack"
            component={CalculatorStack}
            options={{ title: 'Calculator' }}
          />
          <Screen
            name="accountStack"
            component={AccountStack}
            options={{ title: 'My Account' }}
          />
        </Navigator>
      </DeviceProvider>
    </SummaryProvider>
  );
};

export default RootDrawer;
