import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const AddPatient = () => {
  const navigation = useNavigation();
  return (
    <View>
        <CustomHeader
        title="AddPatient"
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={()=>navigation.navigate('notification')}
      />
      <Text>AddPatient</Text>
    </View>
  )
}

export default AddPatient

const styles = StyleSheet.create({})