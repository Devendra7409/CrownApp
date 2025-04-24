import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  
  const slides = [
    require('../../assets/logo_1.png'),
    require('../../assets/logo_2.png'),
    require('../../assets/logo_3.png'),
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');

        if (userData) {
          const user = JSON.parse(userData);
          const userType = user?.userType || 'patient';

          navigation.reset({
            index: 0,
            routes: [{
              name: userType === 'patient' 
                ? "PatientDrawerNavigator" 
                : userType === 'doctor'
                ? "DentistDrawerNavigator"
                : "LabDrawerNavigator"
            }],
          });
        } else {
          setCheckingLogin(false); // Show slides if no user found
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setCheckingLogin(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (!checkingLogin) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex === slides.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              navigation.replace('FinalOnboardingScreen'); 
            }, 500); 
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 100); 

      return () => clearInterval(interval);
    }
  }, [checkingLogin]);

  if (checkingLogin) {
    return (
      <View style={styles.container}>
        <Image source={slides[currentIndex]} style={styles.image} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={slides[currentIndex]} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#303234'
  },
  image: {
    width: '80%',
    height: '40%',
    resizeMode: 'contain'
  }
});
