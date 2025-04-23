import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Alert
} from 'react-native';
import Colors from '../../theme/Colors';
import AntDesign from "react-native-vector-icons/AntDesign";
import { OtpInput } from "react-native-otp-entry";
import CommonButton from '../../components/CommonButton';
import DeviceInfo from 'react-native-device-info';
import { OTP_DOCTOR, OTP_PATIENT, } from '../../services/url';
import { PostApi } from '../../services';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get("window");

const OTPVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const userType = useSelector((state) => state.auth.userType); // Get from Redux

  console.log('UserType====>:', userType);


  useEffect(() => {
    console.log("Route Params Updated:", route?.params);
  }, [route?.params]);


  /** Get the API URL based on userType */
  const getApiUrl = () => {
    switch (userType) {
      case 'patient':
        return OTP_PATIENT;
      case 'doctor':
        return OTP_DOCTOR;
      case 'Lab':
        return SIGNUP_LAB;
      default:
        return OTP_PATIENT; // Default fallback
    }
  };



  const verifyOtp = async () => {
    
    setLoading(true); // Show loader
   
  
    if (otp.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP.");
      return;
    }
    const { patientId, device_id, device_type, device_token,userId } = route.params;
    const apiUrl = getApiUrl(); // Get correct API based on userType
  
    const body = {
      otp: otp,
      device_id,
      device_type,
      device_token,
      ...(userType === "doctor" ? { userId } : {patientId}) // Include doctor_Id only for doctors
    };
  
    console.log("OTP Verification Body:", body);
    
  
    try {
      const response = await PostApi(apiUrl, body);
      console.log("Verification Response:", response);
  
      if (response?.statusCode === 200 && response?.data?.status === "0") {
        if (response?.data?.error?.errorcode === "201") {
          setLoading(false);
          Alert.alert("Error", response?.data?.error?.errormessage || "OTP Verification failed!");
        } else {
          Alert.alert("Success", response?.data?.error?.errormessage, [
            {
              text: "OK",
              onPress: () =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "AuthNavigator", params: { screen: "Login" } }],
                }),
            },
          ]);
        }
        
      } else {
        Alert.alert("Error", response?.data?.message || "OTP Verification failed!");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false); // Hide loader after response
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.contentContainer}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/Transparent_Logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.subtitle}>Complete Dental Solution</Text>
          </View>

          {/* Verification Section */}
          <View style={styles.verificationContainer}>
            <Text style={styles.verificationTitle}>Verification</Text>
            <Text style={styles.verificationText}>
              We have send a one time password to your registered{' '}
              <Text style={styles.highlightText}>Email</Text> and{' '}
              <Text style={styles.highlightText}>Mobile Number</Text>
            </Text>

            {/* OTP Input Section */}
            <OtpInput
              numberOfDigits={4}
              onTextChange={(text) => setOtp(text)}
              theme={{
                containerStyle: styles.otpContainer,
                pinCodeContainerStyle: styles.otpBox,
                focusedPinCodeContainerStyle: styles.otpBox,
              }}
            />

            {/* Resend OTP */}
            <TouchableOpacity style={styles.resendContainer}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            {/* <CommonButton
              title="Send"
              onPress={() => verifyOtp()}
              colors={["#303234", "#626364"]}
              disabled={otp.length < 4}
              style={{ width: '100%' }} // Ensure full width
            /> */}

            <CommonButton
              title="Send"
              onPress={verifyOtp}
              colors={["#303234", "#626364"]}
              disabled={otp.length < 4 || loading} // Disable button when loading
              loading={loading} // Show loader
              style={{ width: '100%' }} // Ensure full width
            />


            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Existing User?{' '}
                <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>Login</Text>
              </Text>
            </View>

            {/* Down Arrow */}
            <View style={styles.bottomArrowContainer}>
              <AntDesign name="down" color={Colors.primary} size={30} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: "center"
  },
  logo: {
    width: width * 0.6,
    height: height * 0.2,
    tintColor: Colors.primary
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textColor,
    fontWeight: "700",
    bottom: 20
  },
  verificationContainer: {
    width: '100%',
    alignItems: 'center',
    top: '15%'
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#303234',
    marginBottom: 15,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  verificationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  highlightText: {
    color: '#FFD700', // Gold color for highlights
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 15,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.8,
    borderColor: '#FFD700', // Gold color for border
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFocused: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  otpText: {
    fontSize: 24,
    color: '#333',
  },
  resendContainer: {
    alignSelf: 'center',
    marginVertical: 15,
  },
  resendText: {
    fontSize: 16,
    color: '#FFD700', // Gold color for resend text
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#333',
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    color: '#FFD700', // Gold color for login link
    fontWeight: 'bold',
  },
  arrowContainer: {
    marginTop: 30,
  },
  arrowText: {
    fontSize: 24,
    color: '#FFD700', // Gold color for arrow
  },
  bottomArrowContainer: {
    alignItems: "center",
    marginTop: height * 0.02
  },
});

export default OTPVerificationScreen;