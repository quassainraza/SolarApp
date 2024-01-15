import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { APPLE_BLUE } from '../../globalStyles';
import { Icon } from 'react-native-paper';

interface Props {
  title?: string;
  subtitle?: string;
  buttonTitle?: string;
  onAction?: () => void;
  onPressTitle?: () => void;
}

const HeaderBar = ({
  title,
  subtitle,
  buttonTitle,
  onAction,
  onPressTitle,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerStyle} onPress={onPressTitle}>
        <Icon source={'map-marker-radius'} color={APPLE_BLUE} size={30} />
        <View>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </TouchableOpacity>
      {buttonTitle && onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.button}>{buttonTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 16,
  },
  subtitle: {
    color: 'black',
    fontSize: 12,
    fontWeight: '300',
  },
  button: {
    color: APPLE_BLUE,
    fontSize: 16,
  },
  headerStyle: { flexDirection: 'row', gap: 5, alignItems: 'center' },
});
