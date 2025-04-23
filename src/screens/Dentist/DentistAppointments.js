import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { useNavigation } from '@react-navigation/native';

const DentistAppointments = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomHeader
        title="Home"
        onMenuPress={() => navigation.openDrawer()}
      />
      <Text>DentistAppointments</Text>
    </View>
  )
}

export default DentistAppointments

const styles = StyleSheet.create({})