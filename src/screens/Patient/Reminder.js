import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';

const Reminder = () => {
    const navigation = useNavigation();
    return (
      <View>
         <CustomHeader
          title="Reminder"
          onMenuPress={() => navigation.openDrawer()}
          onNotificationPress={()=>navigation.navigate('notification')}
        />
      <Text>Reminder</Text>
    </View>
  )
}

export default Reminder

const styles = StyleSheet.create({})