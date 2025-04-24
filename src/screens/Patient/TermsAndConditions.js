import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';

const TermsAndConditions = () => {
    const navigation = useNavigation();
    return (
        <View>
            <CustomHeader
                title="TermsAndConditions"
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => navigation.navigate('notification')}
            />
      <Text>TermsAndConditions</Text>
    </View>
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({})