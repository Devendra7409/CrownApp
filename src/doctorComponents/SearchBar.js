import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../theme/Colors';

const SearchBar = ({
  placeholder = "Search Here",
  value,
  onChangeText,
  onSearch,
  onClear,
  containerStyle,
  inputStyle,
  iconColor = "gold",
  borderColor = "gold",
  showClearButton = true,
  autoCapitalize = "none",
  autoCorrect = false,
}) => {
  return (
    <View style={[styles.container, { borderColor }, containerStyle]}>
      <Icon name="search1" size={20} color={iconColor} style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        placeholderTextColor="#999"
      />
      {showClearButton && value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Icon name="closecircle" size={20} color={iconColor} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  input: {
    flex: 1,
    fontSize: wp(4),
    color: '#333',
    padding: 0,
  },
  clearButton: {
    padding: wp(1),
  },
});

export default SearchBar; 