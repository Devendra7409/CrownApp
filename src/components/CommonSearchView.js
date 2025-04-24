import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CommonSearchView = ({
  placeholder = "Search Here",
  containerStyle,
  iconColor = "gold",
  borderColor = "gold",
  onClick
}) => {
  return (
    <TouchableOpacity style={[styles.container, { borderColor }, containerStyle]} onPress={onClick}>
      <Text style={{color:iconColor,fontWeight:'600',fontSize:14}}>{placeholder}</Text>
      <Icon name="search1" size={20} color={iconColor} style={styles.searchIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: wp(20),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: wp(2),
  },
  clearButton: {
    padding: wp(1),
  },
});

export default CommonSearchView;