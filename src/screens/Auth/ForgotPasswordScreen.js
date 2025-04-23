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
import { LOGIN_PATIENT, LOGIN_DOCTOR,LOGIN_LAB, FORGET_PATIENT, FORGETPASWORD_DOCTOR, FORGETPASWORD_LAB } from '../../services/url'; // Add respective URLs
import { useSelector } from 'react-redux';
import { PostApi } from '../../services';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const userType = useSelector((state) => state.auth.userType); // Get from Redux

  console.log('User Type:', userType);

  /** Get the API URL based on userType */
  const getApiUrl = () => {
    switch (userType) {
      case 'patient':
        return FORGET_PATIENT;
      case 'doctor':
        return FORGETPASWORD_DOCTOR;
      case 'Lab':
        return FORGETPASWORD_LAB;
      default:
        return FORGET_PATIENT; // Default fallback
    }
  };

  /** Validate Inputs */
  const validateInputs = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email or mobile number.");
      return false;
    }
    return true;
  };

  /** Handle Login */
  const Send = async () => {
    if (!validateInputs()) return; // Validate inputs before proceeding

    setLoading(true);

    const device_id = DeviceInfo.getDeviceId();
    const device_type = Platform.OS;
    const device_token = await DeviceInfo.getUniqueId(); // Replace with actual push token if needed
    const apiUrl = getApiUrl(); // Get correct API based on userType

    const body = {
      emailormobile: email,
      device_id,
      device_type,
      device_token,
    };

    console.log("Login Body:", body);

    try {
      const response = await PostApi(apiUrl, body);
      console.log("FORGET Response:", response?.data?.error?.errormessage);
      const { patientId, otp,userId } = response.data; // Extract values safely

      console.log("patientId,otp", patientId, otp,userId);

      if (response?.statusCode === 200 && response?.data?.status === "1") {
        if (response?.data?.error?.errorcode === "201") {
          setLoading(false);
          Alert.alert("Error", response?.data?.error?.errormessage || "FORGET failed!");
        } else {
          setLoading(false);
          Alert.alert("Success", response?.data?.error?.errormessage, [
            {
              text: "OK",
              onPress: () => navigation.navigate("Otp", {
                ...(userType === "doctor" ? { userId }:{patientId}), 
                otp,
                device_id,
                device_type,
                device_token,
              })
            },
          ]);
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
          <Text style={styles.loginTitle}>Forgot Password</Text>

          <InputBox
            label="Email/Mobile Number"
            placeholder="Enter your registered Email or Mobile Number"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CommonButton
            title="Send"
            onPress={Send}
            colors={['#303234', '#626364']}
            loading={loading} 
            disabled={loading} 
          />

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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    marginTop: '50%',
  },  
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  bottomArrowContainer: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
});

export default ForgotPasswordScreen;
