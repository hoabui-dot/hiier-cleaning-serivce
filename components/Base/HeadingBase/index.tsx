import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import {
  IHeadingProps,
  Heading as NBHeading,
  ITheme,
  useTheme,
} from 'native-base';

interface HeadingProps extends IHeadingProps {}

const Heading = (props: HeadingProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return <NBHeading color={'gray.500'} fontSize={'md'} {...props} />;
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({});

export default Heading;
