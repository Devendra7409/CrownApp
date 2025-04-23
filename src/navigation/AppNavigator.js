import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/Onboarding/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import FinalOnboardingScreen from '../screens/Onboarding/FinalOnboardingScreen';
import { PatientDrawerNavigator, DentistDrawerNavigator, LabDrawerNavigator } from './DrawerNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' }
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="FinalOnboardingScreen" component={FinalOnboardingScreen} />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="PatientDrawerNavigator" component={PatientDrawerNavigator} />
        <Stack.Screen name="DentistDrawerNavigator" component={DentistDrawerNavigator} />
        <Stack.Screen name="LabDrawerNavigator" component={LabDrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}