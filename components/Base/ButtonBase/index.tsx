import { ITheme, useTheme } from 'native-base';
import { ReactNode, useMemo } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonBaseProps extends TouchableOpacityProps {
  title: ReactNode;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'outline' | 'solid';
}

const ButtonBase = ({
  title,
  containerStyle,
  textStyle,
  variant = 'outline',
  ...props
}: ButtonBaseProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
      <TouchableOpacity
        {...props}
        style={[styles.container, styles[`${variant}`], containerStyle]}
      >
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      padding: sizes.padding,
      borderRadius: sizes.radius,
      borderColor: colors.primary['400'],
      borderWidth: 1,
    },
    text: {
      textAlign: 'center',
      fontSize: fontSizes.md,
      fontWeight: '500',
    },
    solid: {
      backgroundColor: colors.primary['400'],
    },
    solidText: {
      color: colors.white,
    },
    outline: {
      backgroundColor: colors.white,
    },
    outlineText: {
      color: colors.primary['400'],
    },
  });

export default ButtonBase;
