import { useMemo } from 'react';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon as NBIcon, ITheme, useTheme, IIconProps } from 'native-base';

interface IconProps extends IIconProps {}

const Icon = (props: IconProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return <NBIcon size={5} color="gray.500" {...props} />;
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({});

export default Icon;
