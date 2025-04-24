// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import PatientHomeScreen from '../screens/Patient/PatientHomeScreen';
// import BookOnlineCunsultant from '../screens/Patient/BookOnlineCunsultant';
// import AppointmentsScreen from '../screens/Patient/AppointmentsScreen';
// import ProfileScreen from '../screens/Patient/ProfileScreen';
// import NotificationScreen from '../screens/Patient/NotificationScreen';
// import AddPatient from '../screens/Patient/AddPatient';
// import MyDentist from '../screens/Patient/MyDentist';
// import Prescription from '../screens/Patient/Prescription';
// import MedicalRecord from '../screens/Patient/MedicalRecord';
// import ConsultationScreen from '../screens/Patient/ConsultationScreen';
// import Reminder from '../screens/Patient/Reminder';
// import Payment from '../screens/Patient/Payment';
// import Settings from '../screens/Patient/Settings';
// import HelpCenter from '../screens/Patient/HelpCenter';
// import TermsAndConditions from '../screens/Patient/TermsAndConditions';

// const Stack = createStackNavigator();

// export default function PatientNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
//       <Stack.Screen name="Appointments" component={AppointmentsScreen} />
//       <Stack.Screen name="BookOnlineCunsultant" component={BookOnlineCunsultant} />
//       <Stack.Screen name='AddPatient' component={AddPatient} />
//       <Stack.Screen name='myDentist' component={MyDentist} />
//       <Stack.Screen name='prescription' component={Prescription} />
//       <Stack.Screen name='medicalRecord' component={MedicalRecord} />
//       <Stack.Screen name='consultation' component={ConsultationScreen} />
//       <Stack.Screen name='reminder' component={Reminder} />
//       <Stack.Screen name='payment' component={Payment} />
//       <Stack.Screen name='settings' component={Settings} />
//       <Stack.Screen name='helpCenter' component={HelpCenter} />
//       <Stack.Screen name='termsAndConditions' component={TermsAndConditions} />
//       <Stack.Screen name='Profile' component={ProfileScreen} />
//       <Stack.Screen name='notification' component={NotificationScreen}/>
//     </Stack.Navigator>
//   );
// }
