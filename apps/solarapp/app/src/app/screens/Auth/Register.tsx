import { Text, View } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import TextField from '../../components/atoms/TextField';
import { gstyles } from '../../globalStyles';
import { Button } from 'react-native-paper';
import ScrollLayout from '../../components/layouts/ScrollLayout';
import { UserCtx } from '../../state/contexts/User';
import LoaderWrapper from '../../components/atoms/LoaderWrapper';
import { registerUser } from '../../controllers/user';

const Register = ({ navigation }) => {
  const [user, setUser] = useContext(UserCtx);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onPressRegister = useCallback(async () => {
    setIsLoading(true);
    const result = await registerUser(user);
    if (result) {
      navigation.navigate('login');
    }
    setIsLoading(false);
  }, [user, navigation]);

  const onPressLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <ScrollLayout isSafeArea>
        <View style={[gstyles.pad1, gstyles.gap1, gstyles.flex1]}>
          <Text style={gstyles.mainPageHeader}>
            {"Let's get you Signed up ✔️"}
          </Text>
          <TextField
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.toLowerCase(),
              })
            }
            label="Email"
            keyboardTypeOptions="email-address"
          />
          <TextField
            value={user.firstname}
            onChange={(e) =>
              setUser({
                ...user,
                firstname: e,
              })
            }
            label="First Name"
          />
          <TextField
            value={user.lastname}
            onChange={(e) =>
              setUser({
                ...user,
                lastname: e,
              })
            }
            label="Last Name"
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
          <TextField
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e)}
            label="Verify Password"
            secureTextEntry
            error={
              user.password
                ? user.password !== verifyPassword
                  ? 'Mismatched Password'
                  : ''
                : ''
            }
          />
          <View style={{ flex: 1 }} />
          <Button
            mode="elevated"
            onPress={onPressRegister}
            style={gstyles.button}
            textColor="white"
          >
            Register
          </Button>
          <Button mode="outlined" onPress={onPressLogin} style={gstyles.button}>
            Login Instead
          </Button>
        </View>
      </ScrollLayout>
    </LoaderWrapper>
  );
};

export default Register;
