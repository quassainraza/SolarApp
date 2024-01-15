import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { gstyles } from '../../globalStyles';

interface Props {
  isLoading?: boolean;
  children: JSX.Element | JSX.Element[];
}

const LoaderWrapper = ({ children, isLoading = false }: Props) => {
  return (
    <View style={gstyles.flex1}>
      {children}
      {isLoading && (
        <View style={[styles.container]}>
          <ActivityIndicator color={'white'} />
        </View>
      )}
    </View>
  );
};

export default LoaderWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
