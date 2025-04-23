import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';

const MyDentist = () => {
  const navigation = useNavigation();
  return (
    <View>
        <CustomHeader
        title="MyDentist"
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={()=>navigation.navigate('notification')}
      />
      <Text>MyDentist</Text>
    </View>
  )
}

export default MyDentist

const styles = StyleSheet.create({})