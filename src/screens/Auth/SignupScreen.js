import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../theme/Colors";
import InputBox from "../../components/InputBox";
import CommonButton from "../../components/CommonButton";
import DeviceInfo from "react-native-device-info";
import { PostApi } from "../../services";
import { SIGNUP_DOCTOR, SIGNUP_LAB, SIGNUP_PATIENT } from "../../services/url";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [doctor_Id, setDoctor_ID] = useState('');
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state

  const userType = useSelector((state) => state.auth.userType); // Get from Redux

  console.log('User Type12345:', userType);


  /** Get the API URL based on userType */
  const getApiUrl = () => {
    switch (userType) {
      case 'patient':
        return SIGNUP_PATIENT;
      case 'doctor':
        return SIGNUP_DOCTOR;
      case 'Lab':
        return SIGNUP_LAB;
      default:
        return SIGNUP_PATIENT; // Default fallback
    }
  };

  const handleSignUp = async () => {
    if (!fname || !lname || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (!isChecked) {
      Alert.alert("Error", "You must agree to the Terms & Conditions!");
      return;
    }

    setLoading(true); // Show loader

    const device_id = DeviceInfo.getDeviceId();
    const device_type = Platform.OS;
    const device_token = await DeviceInfo.getUniqueId(); // Replace with actual push token if needed
    const apiUrl = getApiUrl(); // Get correct API based on userType

    const body = {
      fname,
      lname,
      email,
      phone,
      password,
      device_id,
      device_type,
      device_token,
      ...(userType === "doctor" && { doctor_id:doctor_Id }) 
    };

    console.log("Signup Request Body:", body);

    try {
      const response = await PostApi(apiUrl, body);
      console.log("Signup Response:", response);
      const { patientId, otp,userId } = response.data; // Extract values safely

      console.log("patientId,otp", patientId, otp);

      if (response?.statusCode === 200 && response?.data?.status === "0") {
        if (response?.data?.error?.errorcode === "201") {
          setLoading(false);
          Alert.alert("Error", response?.data?.error?.errormessage || "Signup failed!");
        } else {
          setLoading(false);
          Alert.alert("Success", response?.data?.error?.errormessage, [
            {
              text: "OK", onPress: () => navigation.navigate("Otp", {
                ...(userType === "doctor" ? { userId }:{patientId}), 
                otp,
                phone,
                device_id,
                device_type,
                device_token,
              })
            },
          ]);
        }
      } else {
        setLoading(false); // Hide loader
        Alert.alert("Error", response?.data?.message || "Signup failed!");
      }
    } catch (error) {
      setLoading(false); // Hide loader
      console.error("Signup Error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color={Colors.primary} />
          </TouchableOpacity>

          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/Transparent_Logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.subtitle}>Complete Dental Solution</Text>
          </View>

          {/* Signup Form */}
          <View style={styles.formContainer}>
            <Text style={styles.signupTitle}>Signup</Text>

            {userType === "doctor" && (
              <InputBox label="Doctor ID" placeholder="Enter Doctor ID" value={doctor_Id} onChangeText={setDoctor_ID} />
            )}

            <InputBox label="First Name" placeholder="Enter First Name" value={fname} onChangeText={setFname} />
            <InputBox label="Last Name" placeholder="Enter Last Name" value={lname} onChangeText={setLname} />
            <InputBox label="Email" placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <InputBox label="Phone" placeholder="Enter Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" maxLength={10} />

            <InputBox label="Password" placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry showPasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} />

            <InputBox label="Confirm Password" placeholder="Enter Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry showPasswordToggle showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />

            {/* Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsChecked(!isChecked)}
            >
              <MaterialCommunityIcons name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"} size={30} color={Colors.primary} />
              <Text style={styles.checkboxText}>
                By signing in you agree to our <Text style={styles.linkText}>conditions</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <CommonButton
              title="Sign Up"
              onPress={handleSignUp}
              colors={["#303234", "#626364"]}
              disabled={!isChecked || loading}
              loading={loading} // Pass loading state
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Existing User? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomArrowContainer}>
              <AntDesign name="down" color={Colors.primary} size={30} />
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
    backgroundColor: "#fff"
  },
  keyboardView: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20
  },
  backButton: {
    padding: 16
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
  formContainer: {
    flex: 1,
    paddingHorizontal: width * 0.08
  },
  signupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333"
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    flex: 1
  },
  linkText: {
    color: Colors.primary,
    fontWeight: "bold"
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16
  },
  loginText: {
    fontSize: 16,
    color: "#666"
  },
  loginLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold"
  },
  bottomArrowContainer: {
    alignItems: "center",
    marginTop: height * 0.02
  },
});

export default SignupScreen;
