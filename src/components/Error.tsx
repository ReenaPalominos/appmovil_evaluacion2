import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ErrorImage from '../../assets/advertencia.png';

const Error = () => {
  return (
    <View>
      <Image source={ErrorImage} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});

export default Error;



