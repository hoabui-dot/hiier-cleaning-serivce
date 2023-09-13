import { HStack, ITheme, useTheme } from 'native-base';
import { ReactNode, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Heading from '../Heading';
import Icon from '../../utils/Icon/Icon';
import Icons from '../../utils/Icon/Icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

interface HeaderProps {
  headerText?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  backButton?: boolean;
  shadow?: number | string;
  variant?: 'light' | 'dark' | 'transparentLight' | 'transparentDark';
  style?: any
}

const Header = ({
  leftElement,
  rightElement,
  headerText,
  backButton,
  shadow = 1,
  variant = 'dark',
  style
}: HeaderProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  const navigation = useNavigation();

  const variantTintColor = () => {
    switch (variant) {
      case 'transparentLight':
        return 'white';
      case 'transparentDark':
        return 'primary.tan';
      case 'light':
        return 'primary.tan';
      case 'dark':
        return 'primary.gold';
      default:
        return 'white';
    }
  };

  const LeftElementRender = () => {
    if (backButton) {
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon as={Icons.Left} size={6} color={variantTintColor()} />
        </TouchableOpacity>
      );
    } else {
      if (leftElement) {
        return leftElement;
      }
    }
    return;
  };

  const RightElementRender = () => {
    if (rightElement) {
      return rightElement;
    }
    return;
  };
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      style={[styles.container, styles[`${variant}Container`]]}
      shadow={shadow}
    >
      <View style={styles.iconWrap}>{LeftElementRender()}</View>
      <Heading style={[styles.text, styles[`${variant}Text`]]} fontSize={'lg'}>
        {headerText}
      </Heading>
      <View style={styles.iconWrap}>{RightElementRender()}</View>
    </HStack>
  );
};

const makeStyles = ({ colors, sizes }: ITheme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: sizes.padding2,
      position: 'relative',
      zIndex: 999,
      paddingTop: 16 + Constants.statusBarHeight,
      paddingBottom: 16,
    },
    text: {
      textTransform: 'capitalize',
    },
    iconWrap: {
      minWidth: 30,
    },

    darkContainer: {
      backgroundColor: colors.primary.charcoal,
    },
    lightContainer: {
      backgroundColor: colors.white,
    },

    darkText: {
      color: colors.primary.gold,
    },
    lightText: {
      color: colors.primary.tan,
    },

    transparentLightContainer: {
      backgroundColor: 'transparent',
      marginBottom: -55,
    },
    transparentLightText: {
      color: colors.white,
    },

    transparentDarkContainer: {
      backgroundColor: 'transparent',
      marginBottom: -55,
    },
    transparentDarkText: {
      color: colors.primary.gold,
    },
  });

export default Header;
