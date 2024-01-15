import { Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import ScrollLayout from '../../components/layouts/ScrollLayout';
import { gstyles } from '../../globalStyles';
import TextField from '../../components/atoms/TextField';
import { Button } from 'react-native-paper';
import LoaderWrapper from '../../components/atoms/LoaderWrapper';
import { IUser } from '@solarapp/lib';

const AccountInfoUpdater = ({ navigation, route }) => {

  const [newUserDetails, setNewUserDetails] = useState<IUser>({
    ...route?.params?.storedUser,
  });

  const onUpdate = useCallback(() => {
    navigation.navigate('accountInfo', {
      storedUser: newUserDetails,
    });
  }, [newUserDetails]);


  return (
    <ScrollLayout isSafeArea styles={[gstyles.flex1]}>
      <LoaderWrapper>
        <View style={[gstyles.gap05, gstyles.pad1]}>
          <Text style={gstyles.heading1}>My Account</Text>
          <TextField
            value={newUserDetails?.firstname}
            onChange={(e) =>
              setNewUserDetails({
                ...newUserDetails,
                firstname: e,
              })
            }
            label="First Name"
          />
          <TextField
            value={newUserDetails?.lastname}
            onChange={(e) =>
              setNewUserDetails({
                ...newUserDetails,
                lastname: e,
              })
            }
            label="Last Name"
          />
          <View style={{ height: 10 }} />
          <TextField
            value={newUserDetails?.email}
            onChange={(e) =>
              setNewUserDetails({
                ...newUserDetails,
                email: e,
              })
            }
            label="Email Address"
            keyboardTypeOptions="email-address"
          />
          <TextField
            value={newUserDetails?.telephone}
            onChange={(e) =>
              setNewUserDetails({
                ...newUserDetails,
                telephone: e,
              })
            }
            label="Telephone"
            keyboardTypeOptions="number-pad"
          />
          <View style={{ height: 50 }} />
          <Button
            style={[gstyles.button]}
            mode="contained"
            onPress={onUpdate}
          >
            Update Details
          </Button>
        </View>
      </LoaderWrapper>
    </ScrollLayout>
  );
};

export default AccountInfoUpdater;
