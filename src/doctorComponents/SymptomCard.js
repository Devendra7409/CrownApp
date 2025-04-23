import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SymptomCard = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image 
        source={icon} 
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(20),
    aspectRatio: 1,
    backgroundColor: '#FFD700',
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  icon: {
    width: wp(10),
    height: wp(10),
    marginBottom: hp(0.5),
    tintColor: '#8B4513',
  },
  title: {
    fontSize: wp(2.8),
    color: '#8B4513',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: hp(0.5),
  },
});

export default SymptomCard; 