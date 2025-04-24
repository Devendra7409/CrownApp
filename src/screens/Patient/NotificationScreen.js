import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';

const NotificationScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <CustomHeader
                title="NotificationScreen"
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => navigation.navigate('notification')}
            />
            <Text>NotificationScreen</Text>
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({})