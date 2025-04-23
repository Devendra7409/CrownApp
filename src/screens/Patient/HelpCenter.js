import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

const HelpCenter = () => {
    const navigation = useNavigation();
    return (
        <View>
            <CustomHeader
                title="HelpCenter"
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => navigation.navigate('notification')}
            />
            <Text>HelpCenter</Text>
        </View>
    )
}

export default HelpCenter

const styles = StyleSheet.create({})