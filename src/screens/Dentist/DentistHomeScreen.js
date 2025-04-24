import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../../doctorComponents/CustomHeader'
import { useSelector } from 'react-redux'

const DentistHomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state?.doctorAuth.user);

  console.log("user",user);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title=""
        onMenuPress={() => navigation.openDrawer()}
        showProfile={true}
        onNotificationPress={() => navigation.navigate('notification')}
      />
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>{user?.phone}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.doctor_id}</Text>
      </View>
    </SafeAreaView>
  )
}

export default DentistHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})