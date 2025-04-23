import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Colors from '../theme/Colors';

const CustomHeader = ({
    title,
    leftIconType = 'menu',
    onMenuPress,
    onNotificationPress,
    showProfile,
    gradientColors = Colors.LinearGradient, // Default gradient
    textColor = '#fff',
    iconColor = '#fff',
    statusBarColor = gradientColors[0], // Set StatusBar color from gradient start color
    barStyle = 'light-content' // Options: 'light-content' | 'dark-content'
}) => {
    const navigation = useNavigation();

    return (
        <>
            {/* Status Bar */}
            <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />

            <LinearGradient colors={gradientColors} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: wp(2),
            }}>
                {/* Left Side: Menu or Back Icon */}
                <TouchableOpacity onPress={onMenuPress || (() => {
                    if (leftIconType === 'back') {
                        navigation.goBack();
                    }
                })}>
                    <Icon name={leftIconType === 'menu' ? 'menu' : 'arrow-left'} size={30} color={iconColor} />
                </TouchableOpacity>

                {/* Center: Title */}
                {title && <Text style={{ fontSize: wp(5), fontWeight: 'bold', color: textColor }}>{title}</Text>}

                {/* Right Side: Profile & Notification */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {showProfile && (
                        <TouchableOpacity onPress={() => navigation.navigate('dentistProfile')}>
                            <Icon name="account-circle" size={30} color={iconColor} />
                        </TouchableOpacity>
                    )}
                    {onNotificationPress && (
                        <TouchableOpacity onPress={onNotificationPress} style={{ marginLeft: wp(3) }}>
                            <Icon name="bell" size={30} color={iconColor} />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>
        </>
    );
};

export default CustomHeader;

