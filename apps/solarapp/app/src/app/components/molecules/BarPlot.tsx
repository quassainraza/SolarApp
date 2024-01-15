import { StyleSheet, View } from 'react-native';
import React from 'react';
import Bar from '../atoms/Bar';

interface Props {
  numbers: number[];
  highestEverForUser?: number;
}

const BarPlot = ({ numbers, highestEverForUser = 0 }: Props) => {
  return (
    <View style={styles.container}>
      {numbers.map((item, index) => (
        <Bar
          key={index}
          number={item}
          total={Math.max(...numbers, highestEverForUser)}
        />
      ))}
    </View>
  );
};

export default BarPlot;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    height: 230,
    marginVertical: 10,
  },
});
