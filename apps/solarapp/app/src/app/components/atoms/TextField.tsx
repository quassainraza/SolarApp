import React, { ReactNode, useState } from 'react';
import { KeyboardTypeOptions, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { gstyles } from '../../globalStyles';

interface Pros {
  label?: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  keyboardTypeOptions?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  right?: ReactNode;
  left?: ReactNode;
  error?: string;
  disabled?: boolean;
}

const TextField = ({
  label,
  value,
  onChange,
  placeholder,
  keyboardTypeOptions,
  secureTextEntry = false,
  right,
  left,
  error,
  disabled = false,
}: Pros) => {
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View>
      <TextInput
        disabled={disabled}
        value={value}
        onChangeText={onChange}
        mode="outlined"
        label={label}
        placeholder={placeholder}
        keyboardType={keyboardTypeOptions}
        secureTextEntry={!showPassword}
        left={left}
        right={
          right ? (
            right
          ) : secureTextEntry ? (
            <TextInput.Icon
              icon={showPassword ? 'eye' : 'eye-off'}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            right
          )
        }
      />
      {error && <Text style={gstyles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextField;
