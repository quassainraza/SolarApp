import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { StyleSheet } from 'react-native';

export const APPLE_BLUE = '#007AFF';
export const APPLE_RED = '#FF3B30';

export const themeConfig: ThemeProp = {
  colors: {
    primary: '#F4005A',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 217, 223)',
    onPrimaryContainer: 'rgb(63, 0, 24)',
    secondary: '#7D1682',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: '#C2D9FF',
    onSecondaryContainer: 'rgb(50, 0, 71)',
    tertiary: 'rgb(0, 103, 131)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(188, 233, 255)',
    onTertiaryContainer: 'rgb(0, 31, 42)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(32, 26, 27)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 27)',
    surfaceVariant: 'rgb(243, 221, 224)',
    onSurfaceVariant: 'rgb(82, 67, 70)',
    outline: 'gainsboro',
    outlineVariant: 'rgb(214, 194, 196)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(53, 47, 48)',
    inverseOnSurface: 'rgb(250, 238, 239)',
    inversePrimary: 'rgb(255, 177, 194)',
    elevation: {
      level0: 'transparent',
      level1: '#F4005A',
      level2: '#F4005A',
      level3: '#F4005A',
      level4: '#F4005A',
      level5: '#F4005A',
    },
    surfaceDisabled: 'rgba(32, 26, 27, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 27, 0.38)',
    backdrop: 'rgba(58, 45, 47, 0.4)',
  },
};

export const gstyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  bigSupText: {
    fontSize: 15,
    fontWeight: '600',
    opacity: 0.8,
    color: themeConfig.colors.primary,
  },
  bigText: {
    fontSize: 30,
    fontWeight: '600',
    color: themeConfig.colors.primary,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bigSubText: {
    fontSize: 15,
    fontWeight: '400',
    opacity: 0.8,
    color: themeConfig.colors.secondary,
  },
  hFull: {
    minHeight: '100%',
  },
  wFull: {
    minWidth: '100%',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  errorText: {
    padding: 5,
    color: 'red',
    fontSize: 13,
  },
  gap05: {
    gap: 10,
  },
  gap1: {
    gap: 20,
  },
  pad1: {
    padding: 20,
  },
  padX: {
    paddingHorizontal: 20,
  },
  padY: {
    paddingVertical: 20,
  },
  padX05: {
    paddingHorizontal: 10,
  },
  heading1: {
    fontSize: 30,
    fontWeight: '500',
    color: themeConfig.colors.primary,
  },
  mainPageHeader: {
    fontSize: 40,
    fontWeight: '500',
    color: themeConfig.colors.primary,
  },
  button: {
    borderRadius: 10,
    color: 'white',
    padding: 3,
  },
});
