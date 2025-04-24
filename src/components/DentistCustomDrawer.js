import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign'; // Choose suitable icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../theme/Colors';
import { useSelector } from 'react-redux';

const DentistCustomDrawer = (props) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', screen: 'DentistDashboard' },
    { name: 'Appointments', icon: 'calendar', screen: 'dentistAppointments' },
    { name: 'Profile', icon: 'user', screen: 'dentistProfile' },
    { name: 'Setting', icon: 'setting', screen: 'settings' },
  ];
  

  const user = useSelector((state) => state?.doctorAuth.user);

  console.log("user",user);
  


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.LinearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.profileSection}
      >
        <View style={styles.profileContent}>
          <Image
            source={require('../assets/profile_icon.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.doctor_id}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Menu Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <ScrollView>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => props.navigation.navigate(item.screen)}
            >
              <View style={styles.menuLeft}>
                <Icon name={item.icon} size={22} color="#333" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.name}</Text>
              </View>
              <Icon name="right" size={22} color="#333" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </DrawerContentScrollView>
    </View>
  );
};

export default DentistCustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
  },
  profileSection: {
    padding: wp(5),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'transparent',
  },
  profileContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fff',
    resizeMode:'contain'
  },
  profileInfo: {
    justifyContent:'center'
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign:'center'
  },
  profileEmail: {
    fontSize: 14,
    color: '#fff',
    textAlign:'center'
  },
  drawerContent: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Light border for separation
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 2, // Subtle shadow effect
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333', // Dark text for contrast
  },
});
