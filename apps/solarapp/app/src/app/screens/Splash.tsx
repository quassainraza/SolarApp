import { Animated, Easing, View } from 'react-native';
import { gstyles } from '../globalStyles';
import { ActivityIndicator } from 'react-native-paper';
import { useCallback, useContext, useEffect, useRef } from 'react';
import { loginUser } from '../controllers/user';
import { UserCtx } from '../state/contexts/User';
import { SPLASH_TIME } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '@solarapp/lib';

const Splash = ({ navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useContext(UserCtx);

  const animate = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 2000,
      easing: Easing.elastic(1),
    }).start();
  }, [animatedValue]);

  useEffect(() => {
    animate();
    AsyncStorage.getItem('user').then((user) => {
      loginUser(JSON.parse(user) as IUser)
        .then((val) => {
          if (val?.id && setUser) {
            setUser(val);
            if (!val?.id) {
              setTimeout(() => {
                navigation.navigate('authentication');
              }, SPLASH_TIME);
            } else {
              setUser(val);
            }
          } else {
            navigation.navigate('authentication');
          }
        })
        .catch(async (err) => {
          navigation.navigate('authentication');
          await AsyncStorage.clear();
        });
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      setTimeout(() => {
        navigation.navigate('root');
      }, SPLASH_TIME);
    }
  }, [user]);

  return (
    <View style={[gstyles.hFull, gstyles.center, gstyles.gap1]}>
      <Animated.Image
        style={{ transform: [{ scale: animatedValue }] }}
        source={require('../assets/images/logo.png')}
      />
      <Animated.Text style={[gstyles.heading1, { opacity: animatedValue }]}>
        MarillionEx
      </Animated.Text>
      <ActivityIndicator size={20} />
    </View>
  );
};

export default Splash;
