import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomHeader'

const Payment = () => {
    const navigation = useNavigation()
    return (
        <View>
            <CustomHeader
                title="Payment"
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => navigation.navigate('notification')}
            />
            <Text>Payment</Text>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({})