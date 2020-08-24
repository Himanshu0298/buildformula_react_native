import {configureFonts, DefaultTheme} from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Nunito-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Nunito-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Nunito-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Nunito-Light',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Nunito-Bold',
      fontWeight: 'bold',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  dark: false,
  // mode: 'adaptive', //['adaptive','exact']
  colors: {
    ...DefaultTheme.colors,
    primary: '#4872F4',
    accent: '#041D36',
    background: '#fff',
    surface: '#fff',
    text: '#fff',
  },
  fonts: configureFonts(fontConfig),
};
