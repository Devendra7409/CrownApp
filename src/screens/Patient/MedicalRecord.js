import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';

const MedicalRecord = () => {
    const navigation = useNavigation();
    return (
      <View>
          <CustomHeader
          title="MedicalRecord"
          onMenuPress={() => navigation.openDrawer()}
          onNotificationPress={()=>navigation.navigate('notification')}
        />
      <Text>MedicalRecord</Text>
    </View>
  )
}

export default MedicalRecord

const styles = StyleSheet.create({})