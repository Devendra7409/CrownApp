import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
       <CustomHeader
        title="Profile"
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={()=>navigation.navigate('notification')}
      />
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})