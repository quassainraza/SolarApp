import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
}

const Card = ({ children, style }: Props) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 4,
    overflow: 'hidden',
  },
});
