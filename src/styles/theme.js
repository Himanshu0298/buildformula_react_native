import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Colors,
  configureFonts,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';

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

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const theme = {
  ...CombinedDefaultTheme,
  dark: false,
  // mode: 'adaptive', //['adaptive','exact']
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: '#4872F4',
    accent: '#041D36',
    background: '#fff',
    surface: '#fff',
    text: '#000',
    success: Colors.green700,
    warning: Colors.orange500,
    red: '#FF5D5D',
    white: '#fff',
    documentation: 'rgba(243, 122, 80, 1)',
  },
  fonts: configureFonts(fontConfig),
};

export const darkTheme = {
  ...CombinedDarkTheme,
};

export const secondaryTheme = {
  colors: {
    text: '#fff',
  },
};
