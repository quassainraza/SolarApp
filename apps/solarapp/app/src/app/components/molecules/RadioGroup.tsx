import { FlatList, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import Radio, { RadioProps } from '../atoms/Radio';

interface Props {
  options: RadioProps[];
  onSelectOption: (value: RadioProps) => void;
  style?: StyleProp<ViewStyle>;
  activeOption?: string;
}

const RadioGroup = ({
  options,
  onSelectOption,
  style,
  activeOption = options[0].value,
}: Props) => {
  return (
    <FlatList
      contentContainerStyle={style}
      scrollEnabled={false}
      data={options}
      renderItem={({ item }) => (
        <Radio
          label={item.label}
          value={item.value}
          onCheck={() => {
            onSelectOption(item);
          }}
          checked={item.value === activeOption}
        />
      )}
      keyExtractor={({ value }) => value}
    />
  );
};

export default RadioGroup;
