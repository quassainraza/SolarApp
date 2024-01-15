import { Alert, SafeAreaView, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import TextField from '../../components/atoms/TextField';
import { gstyles } from '../../globalStyles';
import { Button } from 'react-native-paper';
import { UserCtx } from '../../state/contexts/User';
import { loginUser } from '../../controllers/user';
import LoaderWrapper from '../../components/atoms/LoaderWrapper';
import { IUser } from '@solarapp/lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLogo } from '../../assets/images/assets';

const Login = ({ navigation }) => {
  const [user, setUser] = useContext(UserCtx);
  const [isLoading, setIsLoading] = useState(false);

  const onPressLogin = useCallback(async () => {
    setIsLoading(true);

    const response = await loginUser(user);
    const castedResponse = response as IUser;

    if (castedResponse?.id) {
      await AsyncStorage.setItem('user', JSON.stringify(castedResponse));
      setUser(castedResponse);
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
    setIsLoading(false);
  }, [user, navigation]);

  const onPressRegister = useCallback(async () => {
    navigation.navigate('register');
    await AsyncStorage.clear();
  }, [navigation]);

  useEffect(() => {
    if (user?.id) {
      navigation.navigate('root');
    }
  }, [user]);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <SafeAreaView style={[gstyles.hFull]}>
        <View style={[gstyles.pad1, gstyles.gap1, gstyles.flex1]}>
          <View style={{ height: 20 }} />
          <AppLogo
            styles={{ height: 200, alignSelf: 'center' }}
            resizeMode="contain"
          />
          <Text style={gstyles.mainPageHeader}>
            {'Welcome to Marillion 👋'}
          </Text>
          <TextField
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e,
              })
            }
            label="Email"
            keyboardTypeOptions="email-address"
          />
          <TextField
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e,
              })
            }
            label="Password"
            secureTextEntry
          />
          <View style={{ flex: 1 }} />
          <Button
            mode="elevated"
            onPress={onPressLogin}
            style={gstyles.button}
            textColor="white"
          >
            Login
          </Button>
          <Button
            mode="outlined"
            onPress={onPressRegister}
            style={gstyles.button}
          >
            Register
          </Button>
        </View>
      </SafeAreaView>
    </LoaderWrapper>
  );
};

export default Login;
