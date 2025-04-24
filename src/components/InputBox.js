import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Colors';

const InputBox = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  showPasswordToggle = false,
  showPassword,
  setShowPassword,
  maxLength
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
           style={[styles.input, { color: value ? '#000' : Colors.primary }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.primary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          maxLength={maxLength}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={24} color="#888" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#303234',
    fontWeight:'700'
  },
  asterisk: {
    color: 'red',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  eyeIcon: {
    padding: 12,
  },
});

export default InputBox;
