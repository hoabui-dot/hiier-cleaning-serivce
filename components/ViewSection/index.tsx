import { useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { ITheme, useTheme } from 'native-base';

interface ViewSectionProps extends ViewProps {
  padding?: 'none' | 'horizontal';
}

const ViewSection = ({
  padding = 'horizontal',
  ...props
}: ViewSectionProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
      <View {...props} style={[styles.container, styles[padding], props.style]} />
  );
};

const makeStyles = ({ colors, fontSizes, sizes }: ITheme) =>
  StyleSheet.create({
    container: {
      // marginTop: sizes.padding * 2,
    },
    horizontal: {
      // paddingHorizontal: sizes.padding * 2,
    },
    none: {},
  });

export default ViewSection;