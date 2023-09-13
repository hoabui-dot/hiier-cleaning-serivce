import { ITheme, useTheme } from 'native-base';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerWrap}>
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = ({ colors }: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.gray['100'],
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerWrap: {
      width: '70%',
    },
  });

export default SplashScreen;
