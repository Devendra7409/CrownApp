import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AppointmentCard = ({ title, onPress, image, style }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        style={[styles.container, style]} 
        onPress={onPress}
        activeOpacity={0.95}
      >
        <Image 
          source={image} 
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    alignItems: 'center',
    justifyContent:'space-between'
  },
  container: {
    width: '95%',
    height: hp(15),
    borderRadius: wp(6),
    overflow: 'hidden',
    marginBottom: hp(1),
  },
  image: {
    width: '100%',
    height: '100%',

  },
  title: {
    color: '#333',
    fontSize: wp(3.5),
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default AppointmentCard; 