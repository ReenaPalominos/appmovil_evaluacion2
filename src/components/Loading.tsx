import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LoadImage from '../../assets/cargando.png';

const Loading = () => {
  return (
    <View>
      <Image source={LoadImage} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
    logo: {
      width: 50,
      height: 50,
    },
  });

export default Loading;