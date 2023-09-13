import images from '../../assets';
import { Image, StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { Center, ITheme, useTheme } from 'native-base';

interface ResultProps {
  image?: string;
  title?: string;
}
const Result = ({ image, title }: ResultProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <Center height={'full'}>
      <Image source={images.noTask} style={styles.img} />
    </Center>
  );
};

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    img: {
      width: 300,
      resizeMode: 'contain',
    },
  });

export default Result;
