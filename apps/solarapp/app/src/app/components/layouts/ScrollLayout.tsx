import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { gstyles } from '../../globalStyles';
import { getPlatform } from '../../utils/utils';

interface Props {
  children?: JSX.Element | JSX.Element[];
  styles?: StyleProp<ViewStyle>;
  isSafeArea?: boolean;
}

const ScrollLayout = ({ children, styles, isSafeArea = false }: Props) => {
  if (isSafeArea) {
    return (
      <KeyboardAvoidingView
        behavior={getPlatform() === 'ios' ? 'height' : 'position'}
      >
        <SafeAreaView>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles}
            style={gstyles.hFull}
          >
            {children}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={getPlatform() === 'ios' ? 'height' : 'position'}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles}
        style={gstyles.hFull}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScrollLayout;
