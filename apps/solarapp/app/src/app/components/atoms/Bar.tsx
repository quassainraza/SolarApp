import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { themeConfig } from '../../globalStyles';

interface Props {
  number: number;
  total: number;
  activeLabel?: boolean;
  label?: string;
}

const Bar = ({ number, total, label, activeLabel = false }: Props) => {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: number / total,
      useNativeDriver: false,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [height, number, total]);

  const heightInterpolated = height.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Animated.View
          style={[styles.bar, { maxHeight: heightInterpolated }]}
        />
      </View>
      {label && (
        <Text
          style={[
            styles.textCenter,
            { color: activeLabel ? themeConfig.colors.primary : 'gray' },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

export default Bar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  barContainer: {
    backgroundColor: '#DDDDDD',
    borderRadius: 30,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    backgroundColor: themeConfig.colors.primary,
    height: '100%',
  },
  textCenter: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 10,
  },
});
