import React from 'react';
import { View, StyleSheet } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  cardStyle?: any;
}

const Card = ({cardStyle, children}: CardProps) => {
  return (
    <View style={[styles.container, cardStyle]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;