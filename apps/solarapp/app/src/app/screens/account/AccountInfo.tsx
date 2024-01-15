import { Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ScrollLayout from '../../components/layouts/ScrollLayout';
import { gstyles } from '../../globalStyles';
import TextField from '../../components/atoms/TextField';
import { UserCtx } from '../../state/contexts/User';
import { Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { updateUser } from '../../controllers/user';
import { IUser } from '@solarapp/lib';
import LoaderWrapper from '../../components/atoms/LoaderWrapper';
import { errorHandler } from '../../utils/utils';

const AccountInfo = ({ navigation, route }) => {
  const [isFocused, setIsFocused] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [storedUser, setStoredUser] = useContext(UserCtx);

  const onUpdate = useCallback(() => {
    navigation.navigate('accountInfoUpdater', {
      storedUser: {
        ...storedUser,
        password: '',
      } as IUser,
    });
  }, [storedUser]);

  const onUpdateSecuritySettings = useCallback(() => {
    // Update Security settings
  }, [storedUser]);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [isFocused])
  );

  useEffect(() => {
    if (isFocused) {
      if (route?.params?.storedUser?.id) {
        setIsLoading(true);
        updateUser(route?.params?.storedUser as IUser)
          .then((val) => {
            if (val?.response) {
              setStoredUser({
                ...val.response,
              });
            }
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            errorHandler(err, true);
          });
      }
    }
  }, [isFocused]);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <ScrollLayout isSafeArea styles={[gstyles.pad1, gstyles.gap05]}>
        <Text style={gstyles.heading1}>Account Information</Text>
        <View style={{ height: 10 }} />
        <TextField
          disabled
          value={storedUser?.firstname}
          onChange={(e) =>
            setStoredUser({
              ...storedUser,
              firstname: e,
            })
          }
          label="First Name"
        />

        <TextField
          disabled
          value={storedUser?.lastname}
          onChange={(e) =>
            setStoredUser({
              ...storedUser,
              lastname: e,
            })
          }
          label="Last Name"
        />
        <View style={{ height: 10 }} />
        <TextField
          disabled
          value={storedUser?.email}
          onChange={(e) =>
            setStoredUser({
              ...storedUser,
              email: e,
            })
          }
          label="Email Address"
          keyboardTypeOptions="email-address"
        />
        <TextField
          disabled
          value={storedUser?.telephone}
          onChange={(e) =>
            setStoredUser({
              ...storedUser,
              telephone: e,
            })
          }
          label="Telephone"
          keyboardTypeOptions="number-pad"
        />
        <View style={{ height: 10 }} />
        <Button
          style={gstyles.button}
          textColor="white"
          mode="elevated"
          onPress={onUpdate}
        >
          Update Details
        </Button>
        <View
          style={{
            height: 0.5,
            backgroundColor: 'gainsboro',
            marginVertical: 20,
          }}
        />
        <Text style={gstyles.heading1}>Security Settings</Text>
        <View style={{ height: 10 }} />
        <Button
          style={gstyles.button}
          textColor="white"
          mode="elevated"
          onPress={onUpdateSecuritySettings}
        >
          Update
        </Button>
      </ScrollLayout>
    </LoaderWrapper>
  );
};

export default AccountInfo;
