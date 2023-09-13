import { ColorMode, extendTheme, IButtonProps, ITheme } from 'native-base';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const theme = extendTheme({
  breakpoints: {
    base: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
  },
  sizes: {
    // global sizes
    base: 8,
    font: 14,
    radius: 10,
    circleRadius: 30,
    paddingBasic: 4,
    padding: 10,
    padding2: 15,
    // app dimensions
    width,
    height,
  },
  radii: {
    base: 10,
  },
  space: {
    base: 10,
  },
  fontSizes: {
    base: 14,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
  },

  colors: {
    // base colors
    primary: {
      100: '#ede9fe',
      400: '#a78bfa',
      tan: '#B68D40',
      cream: '#F4EBD0',
      charcoal: '#122620',
      gold: '#D6AD60',
    }, // violet
    purple: '#683DB4',
    secondary: {
      100: '#F4F4F4',
      400: '#a1a1aa',
      500: '#71717a',
    }, // gray
    gray: '#9E9E9E',
    blackTransparent: 'rgba(0,0,0,0.5)',
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof theme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

export default theme;