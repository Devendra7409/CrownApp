import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';

const Prescription = () => {
    const navigation = useNavigation();
    return (
      <View>
          <CustomHeader
          title="Prescription"
          onMenuPress={() => navigation.openDrawer()}
          onNotificationPress={()=>navigation.navigate('notification')}
        />
      <Text>Prescription</Text>
    </View>
  )
}

export default Prescription

const styles = StyleSheet.create({})