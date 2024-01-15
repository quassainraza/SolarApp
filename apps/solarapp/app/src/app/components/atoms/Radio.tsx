import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RadioButton } from 'react-native-paper';

export interface RadioProps {
  label?: string;
  value?: string;
  checked?: boolean;
  onCheck?: () => void;
}

const Radio = ({ onCheck, checked, label, value }: RadioProps) => {
  return (
    <TouchableOpacity onPress={onCheck}>
      <View style={styles.container}>
        <View style={styles.radio}>
          <RadioButton
            onPress={onCheck}
            value={value}
            status={checked ? 'checked' : 'unchecked'}
          />
        </View>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radio: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'gainsboro',
  },
  text: {
    color: 'rgb(50,50,50)',
    fontSize: 15,
  },
});
