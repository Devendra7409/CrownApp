import { ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const CommonButton = ({ title,titleStyle, onPress, colors, loading, disabled,style = {}, }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? '#ccc' : colors[0] },style,]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.text,titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommonButton;