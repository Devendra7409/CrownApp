import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Colors';

const SpecialistCard = ({ name, specialty, image, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image 
        source={image} 
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.specialty} numberOfLines={1}>{specialty}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={wp(3.5)} color="#FFD700" />
          <Text style={styles.rating}>4.5</Text>
          <Text style={styles.reviews}>(120+ Reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(40),
    height: hp(25),
    backgroundColor: Colors.onSecondary,
    borderRadius: wp(4),
    marginRight: wp(3),
    overflow: 'hidden',
    borderWidth:0.5
    // elevation: 9,
  },
  image: {
    width: '100%',
    height: '60%',
  },
  infoContainer: {
    padding: wp(3),
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: wp(3),
    color: '#666',
    marginTop: hp(0.3),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  rating: {
    fontSize: wp(3),
    color: '#333',
    marginLeft: wp(1),
    fontWeight: '600',
  },
  reviews: {
    fontSize: wp(2.8),
    color: '#666',
    marginLeft: wp(1),
  },
});

export default SpecialistCard; 