import React from 'react';
import { View, StyleSheet } from 'react-native';

export interface ColBaseProps {
  numRows: 1 | 2 | 3 | 4;
  children: React.ReactNode,
  style?: any,
}

const Col = ({ numRows, children, style }:ColBaseProps) => (
  <View style={[styles[`${numRows}col`], style]}>{children}</View>
);

export default Col;

const styles = StyleSheet.create({
  '1col': {
    backgroundColor: 'lightblue',
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1,
  },
  '2col': {
    backgroundColor: 'green',
    borderColor: '#fff',
    borderWidth: 1,
    flex: 2,
  },
  '3col': {
    backgroundColor: 'orange',
    borderColor: '#fff',
    borderWidth: 1,
    flex: 3,
  },
  '4col': {
    flex: 4,
  },
});
