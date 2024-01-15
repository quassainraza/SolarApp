import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import React, { useCallback, useContext, useRef } from 'react';
import { IDevice } from '@solarapp/lib';
import Card from '../atoms/Card';
import { Swipeable } from 'react-native-gesture-handler';
import {
  APPLE_BLUE,
  APPLE_RED,
  gstyles,
  themeConfig,
} from '../../globalStyles';
import { DevicesCtx } from '../../state/contexts/Device';
import { deleteDeviceById } from '../../controllers/device';
import { compactNumber, errorHandler } from '../../utils/utils';

interface Props {
  thisDevice: IDevice;
  onEdit: () => void;
  onShowPVForecast?: () => void;
}

const DeviceCard = ({ onEdit, thisDevice, onShowPVForecast }: Props) => {
  const translate = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(100)).current;
  const [devices, setDevices] = useContext(DevicesCtx);

  const onDelete = useCallback(() => {
    deleteDeviceById(thisDevice)
      .then((_) => {
        // animation part
        Animated.timing(translate, {
          toValue: Dimensions.get('window').width,
          useNativeDriver: false,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        }).start();
        Animated.timing(heightAnim, {
          delay: 700,
          toValue: 0,
          useNativeDriver: false,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        }).start();
        setTimeout(() => {
          // do the deletion after 2 seconds to keep animations smooth
          setDevices(devices.filter((device) => device.id !== thisDevice.id));
        }, 1500);
      })
      .catch((err) => {
        errorHandler({
          message: 'Could not delete device at the moment, please refresh',
        });
      });
  }, []);

  const renderLeftActions = (_: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[gstyles.flex1, { backgroundColor: APPLE_RED }]}
          onPress={onDelete}
        >
          <Animated.View
            style={[
              gstyles.flex1,
              gstyles.center,
              {
                opacity: trans,
              },
            ]}
          >
            <Text style={styles.textStyle}>Delete</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[gstyles.flex1, { backgroundColor: APPLE_BLUE }]}
          onPress={onEdit}
        >
          <Animated.View
            style={[
              gstyles.flex1,
              gstyles.center,
              {
                opacity: trans,
              },
            ]}
          >
            <Text style={styles.textStyle}>Edit</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };
  const renderRightActions = (_: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [1, 1, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.buttonContainer, { width: '30%' }]}>
        <TouchableOpacity
          style={[
            gstyles.flex1,
            { backgroundColor: themeConfig.colors.primary },
          ]}
          onPress={onShowPVForecast}
        >
          <Animated.View
            style={[
              gstyles.flex1,
              gstyles.center,
              {
                opacity: trans,
              },
            ]}
          >
            <Text style={styles.textStyle}>Forecast</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Animated.View
      onLayout={(e) => {
        Animated.timing(heightAnim, {
          toValue: e.nativeEvent.layout.height,
          delay: -20,
          duration: 0,
          useNativeDriver: false,
        });
      }}
      style={[
        gstyles.padX,
        styles.cardContainer,
        {
          transform: [{ translateX: translate }],
          overflow: 'hidden',
          height: heightAnim,
        },
      ]}
    >
      <Card style={[{ padding: 0, flex: 1 }]}>
        <Swipeable
          containerStyle={[styles.swipeableStyle]}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}
          childrenContainerStyle={styles.container}
        >
          <View style={styles.cardFirstHalfStyle}>
            <Text style={styles.title}>{thisDevice.title}</Text>
            <Text style={styles.type}>{thisDevice.type}</Text>
          </View>
          <View style={[styles.cardFirstHalfStyle, { alignItems: 'flex-end' }]}>
            <Text style={styles.serialNo}>{thisDevice.serialNo}</Text>
            <Text style={[styles.serialNo, { fontSize: 12 }]}>
              {compactNumber((thisDevice as any)?.credits)} Credits
            </Text>
          </View>
        </Swipeable>
      </Card>
    </Animated.View>
  );
};

export default DeviceCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: 15,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    overflow: 'hidden',
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  type: {
    fontSize: 15,
    fontWeight: '300',
  },
  serialNo: {
    fontSize: 15,
    opacity: 0.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '50%',
    overflow: 'hidden',
  },
  swipeableStyle: {
    overflow: 'hidden',
    borderRadius: 10,
    flex: 1,
  },
  textStyle: { color: 'white', fontWeight: '600', fontSize: 15 },
  cardFirstHalfStyle: {
    height: '100%',
    justifyContent: 'space-between',
  },
});
