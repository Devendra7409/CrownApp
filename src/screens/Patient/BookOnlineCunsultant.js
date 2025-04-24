import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { useNavigation } from '@react-navigation/native';

const BookOnlineCunsultant = () => {
  const navigation = useNavigation();
  return (
    <View>
        <CustomHeader
        title="BookOnlineCunsultant"
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={()=>navigation.navigate('notification')}
      />
      <Text>BookOnlineCunsultant</Text>
    </View>
  )
}

export default BookOnlineCunsultant

const styles = StyleSheet.create({})