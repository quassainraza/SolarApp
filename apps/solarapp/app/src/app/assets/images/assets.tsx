import React from 'react';
import { Image, ImageResizeMode, ImageStyle, StyleProp } from 'react-native';

export const AppLogo = ({
  styles,
  resizeMode,
}: {
  styles?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}) => {
  return (
    <Image
      style={styles}
      source={require('../images/logo.png')}
      resizeMode={resizeMode}
    />
  );
};
