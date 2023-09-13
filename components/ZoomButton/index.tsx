import { ITheme, useTheme } from 'native-base';
import React, { useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Icon from '../../utils/Icon/Icon';

export interface ZoomButtonProps {
  onGoCurrentLocation: () => void;
}

const ZoomButton = ({ onGoCurrentLocation }: ZoomButtonProps) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onGoCurrentLocation}>
        <Icon
          as={Entypo}
          name={'location-pin'}
          size={10}
          color={'rgba(0, 0, 0, 0.6)'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ZoomButton;

const makeStyles = (args: ITheme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: -20,
      right: args.sizes.padding * 4,
      width: 60,
      height: 130,
      justifyContent: 'space-between',
      zIndex: 10,
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    zoomInButton: {
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
