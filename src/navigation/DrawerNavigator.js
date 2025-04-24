import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Image } from 'react-native';
import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import Patient screens here
import ProfileScreen from '../screens/Patient/ProfileScreen';
import PatientHomeScreen from '../screens/Patient/PatientHomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import AppointmentsScreen from '../screens/Patient/AppointmentsScreen';
import BookOnlineCunsultant from '../screens/Patient/BookOnlineCunsultant';
import NotificationScreen from '../screens/Patient/NotificationScreen';
import AddPatient from '../screens/Patient/AddPatient';
import MyDentist from '../screens/Patient/MyDentist';
import Prescription from '../screens/Patient/Prescription';
import MedicalRecord from '../screens/Patient/MedicalRecord';
import Consultation from '../screens/Patient/ConsultationScreen';
import Reminder from '../screens/Patient/Reminder';
import Payment from '../screens/Patient/Payment';
import Settings from '../screens/Patient/Settings';
import HelpCenter from '../screens/Patient/HelpCenter';
import TermsAndConditions from '../screens/Patient/TermsAndConditions';
import DentistSearch from '../screens/Patient/DentistSearch';

//Import Dentist screens here
import DentistHomeScreen from '../screens/Dentist/DentistHomeScreen';
import DentistAppointments from '../screens/Dentist/DentistAppointments';
import DentistProfile from '../screens/Dentist/DentistProfile';
import DentistCustomDrawer from '../components/DentistCustomDrawer';
import Notification from '../screens/Dentist/Notification';




const Drawer = createDrawerNavigator();

// Custom Drawer Content Component


// Patient Drawer Navigator
export const PatientDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} userType="patient" />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: Colors.primary,
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
    }}
  >
    <Drawer.Screen name="Home" component={PatientHomeScreen} />
    <Drawer.Screen name="Appointments" component={AppointmentsScreen} />
    <Drawer.Screen name="BookOnlineCunsultant" component={BookOnlineCunsultant} />
    <Drawer.Screen name="AddPatient" component={AddPatient} />
    <Drawer.Screen name="myDentist" component={MyDentist} />
    <Drawer.Screen name="prescription" component={Prescription} />
    <Drawer.Screen name='medicalRecord' component={MedicalRecord} />
    <Drawer.Screen name="consultation" component={Consultation} />
    <Drawer.Screen name='reminder' component={Reminder} />
    <Drawer.Screen name='payment' component={Payment} />
    <Drawer.Screen name='settings' component={Settings} />
    <Drawer.Screen name='helpCenter' component={HelpCenter} />
    <Drawer.Screen name='termsAndConditions' component={TermsAndConditions} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="notification" component={NotificationScreen} />
    <Drawer.Screen name="dentistSearch" component={DentistSearch} />
  </Drawer.Navigator>
);

// Dentist Drawer Navigator
export const DentistDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DentistCustomDrawer {...props} userType="doctor" />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: Colors.primary,
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
    }}
  >
    <Drawer.Screen
      name="DentistDashboard"
      component={DentistHomeScreen}
      options={{
        title: 'Dashboard',
        drawerIcon: ({ color }) => <Icon name="dashboard" size={24} color={color} />,
      }}
    />
    <Drawer.Screen
      name="dentistAppointments"
      component={DentistAppointments}
      options={{
        drawerIcon: ({ color }) => <Icon name="event" size={24} color={color} />,
      }}
    />
    <Drawer.Screen
      name="dentistProfile"
      component={DentistProfile}
      options={{
        drawerIcon: ({ color }) => <Icon name="person" size={24} color={color} />,
      }}
    />
    <Drawer.Screen 
    name="notification"
    component={Notification}
    options={{
      drawerIcon: ({ color }) => <Icon name="settings" size={24} color={
        color
        } />,
        }}
        />
        <Drawer.Screen name='settings' component={Settings} />
  </Drawer.Navigator>
);

// Lab Drawer Navigator
export const LabDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} userType="Lab" />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: Colors.primary,
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
    }}
  >
    <Drawer.Screen
      name="LabDashboard"
      component={DentistHomeScreen}
      options={{
        title: 'Dashboard',
        drawerIcon: ({ color }) => <Icon name="dashboard" size={24} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Orders"
      component={AppointmentsScreen}
      options={{
        drawerIcon: ({ color }) => <Icon name="assignment" size={24} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color }) => <Icon name="person" size={24} color={color} />,
      }}
    />

  </Drawer.Navigator>
);

// Default export for backward compatibility
export default function DrawerNavigator() {
  return <PatientDrawerNavigator />;
}
