import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import Colors from '../../theme/Colors';
import  Icon  from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { setUserType } from '../../redux/slices/pateientauthSlice';
import { setAuthType } from '../../redux/slices/authSlice';

const { width, height } = Dimensions.get('window');

const FinalOnboardingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const options = [
    {
      id: 1,
      title: 'Looking for a Dentist',
      userType:'patient',
      subtitle: 'Find specialised Dentist in one place',
      icon: require('../../assets/patient_icon.png'), // You'll need to add these icons to your assets
    },
    {
      id: 2,
      title: 'Dentist',
      userType:'doctor',
      subtitle: 'Schedule Regular Dental Checkups',
      icon: require('../../assets/dentist_icon.png'),
    },
    {
      id: 3,
      title: 'Lab',
      userType:'Lab',
      subtitle: 'Join the network of Labs',
      icon: require('../../assets/lab_icon.png'),
    },
  ];

  const handleSelect = (option) => {
    dispatch(setAuthType(option.userType)); // Store selected user type in Redux
    navigation.navigate('AuthNavigator'); // Navigate without params
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF"
      />
      
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Transparent_Logo.png')} // Add your logo to assets
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Complete Dental Solution</Text>
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Hey, Welcome</Text>
        <Text style={styles.welcomeSubtitle}>
          Select your profile type to proceed further.
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionCard}
            // onPress={() => navigation.navigate('AuthNavigator')}
            onPress={() => handleSelect(option)} // Dispatch Redux action on press
          >
            <Image source={option.icon} style={styles.optionIcon} />
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Arrow */}
      <View style={styles.bottomArrowContainer}>
      <Icon name="down" color={Colors.primary}  size={40}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    tintColor:Colors.primary
  },
  logoText: {
    fontSize: 16,
    color: '#666666',
    bottom:20
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#FFD700',
    marginTop: 8,
  },
  optionsContainer: {
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.03,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  optionTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  optionSubtitle: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  bottomArrowContainer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: height * 0.03,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.primary,
  },
});

export default FinalOnboardingScreen;