import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const ConsultationScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
       <CustomHeader
        title="Consultation"
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={()=>navigation.navigate('notification')}
      />
      <Text>ConsultationScreen</Text>
    </View>
  )
}

export default ConsultationScreen

const styles = StyleSheet.create({})