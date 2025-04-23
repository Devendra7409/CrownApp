import React, { useEffect } from 'react';
import { Alert, Button, View } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

const BiometricAuth = () => {
  const authenticateUser = async () => {

    if (BiometryTypes.Biometrics === 'Biometrics') {
      Alert.alert('Biometric authentication available');
    } else {
      Alert.alert('Biometric authentication not available');
    }
  };

  useEffect(() => {
    authenticateUser(); // Auto-trigger authentication when the app opens
  }, []);

  return (
    <View>
      <Button title="Authenticate Again" onPress={authenticateUser} />
    </View>
  );
};

export default BiometricAuth;
