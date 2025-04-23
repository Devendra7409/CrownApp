import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Colors';
import InputBox from '../../components/InputBox';
import CommonButton from '../../components/CommonButton';
import Icon from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';
import { LOGIN_PATIENT, LOGIN_DOCTOR, LOGIN_LAB } from '../../services/url'; // Add respective URLs
import { PostApi } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser as setPatientUser } from '../../redux/slices/pateientauthSlice';
import { setData as setDoctorUser } from '../../redux/slices/doctorauthSlice';


const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.selectedAuthType);

  console.log('User Type:', userType);

  /** Get the API URL based on userType */
  const getApiUrl = () => {
    switch (userType) {
      case 'patient':
        return LOGIN_PATIENT;
      case 'doctor':
        return LOGIN_DOCTOR;
      case 'Lab':
        return LOGIN_LAB;
      default:
        return LOGIN_PATIENT; // Default fallback
    }
  };

  /** Validate Inputs */
  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email or mobile number.");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password.");
      return false;
    }
    if (password.length < 5) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  /** Handle Login */
  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    const device_id = DeviceInfo.getDeviceId();
    const device_type = Platform.OS;
    const device_token = await DeviceInfo.getUniqueId();
    const apiUrl = getApiUrl();

    const body = {
      emailormobile: email,
      pass: password,
      device_id,
      device_type,
      device_token,
    };

    console.log("Login Body:", body);

    try {
      const response = await PostApi(apiUrl, body);
      console.log("Login Response:", response?.data?.error?.errormessage);

      if (response?.statusCode === 200 && response?.data?.status === "1") {
        setLoading(false);

        if (response?.data?.error?.errorcode === "201") {
          Alert.alert("Error", response?.data?.error?.errormessage || "Login failed!");
        } else {
          // Store user data in Redux
          console.log("response.data.user", response.data);

          // dispatch(setUser(response.data)); // Assuming user data is inside response.data.user
          if (userType === 'doctor') {
            dispatch(setDoctorUser(response.data));
          } else if (userType === 'patient') {
            dispatch(setPatientUser(response.data));
          } else if (userType === 'Lab') {
            dispatch(setLabUser(response.data));
          }

          // Store login data persistently
          await AsyncStorage.setItem('userData', JSON.stringify({ ...response.data, userType }));
          // await AsyncStorage.setItem('userData', JSON.stringify({ ...response.data, userType }));
          console.log("Saving userData:", { ...response.data, userType });




          // After successful login, navigate based on user type
          const navigatorName = userType === 'patient'
            ? 'PatientDrawerNavigator'
            : userType === 'doctor'
              ? 'DentistDrawerNavigator'
              : 'LabDrawerNavigator';

          navigation.reset({
            index: 0,
            routes: [{ name: navigatorName }],
          });
        }
      } else {
        setLoading(false);
        Alert.alert("Error", response?.data?.error?.errormessage || "Login failed!");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color={Colors.primary} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/Transparent_Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>Complete Dental Solution</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.loginTitle}>Login</Text>

            <InputBox
              label="Email/Mobile Number"
              placeholder="Enter Email or Mobile Number"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <InputBox
              label="Password"
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              showPasswordToggle
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password</Text>
            </TouchableOpacity>

            <CommonButton
              title="Login"
              onPress={handleLogin}
              colors={['#303234', '#626364']}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>New User? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Signup</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomArrowContainer}>
              <Icon name="down" color={Colors.primary} size={30} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20
  },
  backButton: {
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 280,
    height: 160,
    tintColor: Colors.primary
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textColor,
    fontWeight: '700'
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    bottom: 10,
  },
  forgotPasswordText: {
    color: '#333',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 16,
    color: '#666',
  },
  signupLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bottomArrowContainer: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
});

export default LoginScreen;
