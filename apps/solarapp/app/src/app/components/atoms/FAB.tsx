import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import { AnimatedFAB } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { gstyles } from '../../globalStyles';

interface Props {
  icon: IconSource;
  onPress: () => void;
}

const FAB = ({ icon, onPress }: Props) => {
  return (
    <SafeAreaView style={[gstyles.wFull]}>
      <View>
        <AnimatedFAB
          icon={icon}
          label="label"
          extended={false}
          onPress={onPress}
          visible={true}
          iconMode={'static'}
          animateFrom="right"
          style={styles.fabStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default FAB;

const styles = StyleSheet.create({
  fabStyle: {
    right: 20,
    bottom: 0,
    position: 'absolute',
  },
});
