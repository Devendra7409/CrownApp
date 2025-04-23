import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import SettingsContainer from '../../components/SettingsContainer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/pateientauthSlice';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [reminderVolume, setReminderVolume] = useState(true);
  const [vibrate, setVibrate] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('userData');

      // Dispatch the logout action to reset Redux state
      dispatch(logoutUser());

      // Navigate the user to the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'FinalOnboardingScreen' }], // Ensure 'LoginScreen' is the correct route name
      });
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };


  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleLogout(),
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <CustomHeader title="Settings" leftIconType="back" barStyle="light-content" />

      {/* Scrollable Settings List */}
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.titleStyle}>Notification Settings</Text>
        <SettingsContainer
          title="Notifications"
          onPress={() => navigation.navigate('notification')}
          showArrow={true}
        />

        <Text style={styles.titleStyle}>Reminder Settings</Text>
        <SettingsContainer
          title="Reminder Volume"
          value={reminderVolume}
          onToggle={() => setReminderVolume((prev) => !prev)}
        />
        <SettingsContainer
          title="Vibrate"
          value={vibrate}
          onToggle={() => setVibrate((prev) => !prev)}
        />
        <SettingsContainer title="Reminder Volume" onPress={() => ''} showArrow={true} />
        <SettingsContainer title="Vibrate" onPress={() => ''} showArrow={true} />
        <SettingsContainer title="Popup Notification" subtitle="Always show popup" onPress={() => ''} showArrow={true} />

        <Text style={styles.titleStyle}>General</Text>
        <SettingsContainer title="About" onPress={() => ''} />
        <SettingsContainer title="Privacy Policy" onPress={() => ''} />
        <SettingsContainer title="Help and Support" onPress={() => ''} />
        <SettingsContainer title="Share with Friends and Family" onPress={() => ''} />
        <SettingsContainer title="Rate" onPress={() => ''} />
        <SettingsContainer title="Are you a Dentist?" onPress={() => ''} />

        <Text style={styles.titleStyle}>Accounts</Text>
        <SettingsContainer title="Logout" titleColor={'green'} onPress={() => confirmLogout()} />
        <SettingsContainer title="Delete" titleColor={'red'} onPress={() => Alert.alert('Delete')} />


      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 20, // Adds space at the bottom to prevent last item from being cut off
  },
  titleStyle: {
    width: wp(100),
    height: 50,
    backgroundColor: Colors.primary,
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'bold',
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    marginTop: wp(2),
    borderWidth: 1,
    borderColor: Colors.primary,
    textAlignVertical: 'center',
  },
});
