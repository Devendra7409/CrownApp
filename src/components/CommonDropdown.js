// components/CommonDropdown.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../theme/Colors';

const CommonDropdown = ({ data, value, onChange, placeholder = 'Select option' }) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.onPrimary,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 20,
    marginTop: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.black,
    fontWeight:'600'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.black,
    fontWeight:'600'
  },
});

export default CommonDropdown;
