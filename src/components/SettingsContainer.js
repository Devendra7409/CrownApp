import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../theme/Colors';

const SettingsContainer = ({ titleColor, iconName, title, value, onToggle, showArrow = false, subtitle, onPress }) => {    
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress} // Handle press events
            style={{
                width: wp(100),
                height: 45,
                borderWidth: 1,
                borderColor: Colors.primary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(4),
                backgroundColor: '#fff',
                marginTop: 10,
            }}
        >
            {/* Left Icon & Text */}
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {iconName && <Icon name={iconName} size={wp(6)} color="#444" />}
                <View style={{ marginLeft: iconName ? wp(3) : 0 }}>
                    <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: titleColor === 'green' ? 'green' : titleColor === 'red' ? 'red' : '#000' }}>{title}</Text>
                    {subtitle && <Text style={{ fontSize: wp(3), color: '#777' }}>{subtitle}</Text>}
                </View>
            </View>

            {/* Right Side: Either Switch or Arrow */}
            {onToggle !== undefined ? (
                <Switch value={value} onValueChange={onToggle} />
            ) : showArrow ? (
                <Icon name="chevron-right" size={wp(6)} color="#777" />
            ) : null}
        </TouchableOpacity>
    );
};

export default SettingsContainer;
