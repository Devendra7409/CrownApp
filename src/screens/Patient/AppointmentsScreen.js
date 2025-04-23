import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { useNavigation } from '@react-navigation/native';

const AppointmentsScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomHeader
        title="AppointmentsScreen"
        onMenuPress={() => navigation.openDrawer()}
      />
      <Text>AppointmentsScreen</Text>
    </View>
  )
}

export default AppointmentsScreen

const styles = StyleSheet.create({})