import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  dark: false,
  // mode: 'adaptive', //['adaptive','exact']
  colors: {
    ...DefaultTheme.colors,
    primary: '#0090d8',
    background: '#fff',
    surface: '#fff',
    text: '#000',
  },
};

