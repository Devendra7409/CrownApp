import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../theme/Colors';

const CommonHeaderWithTabs = ({ activeTab, setActiveTab, onBackPress }) => {
    return (
        <View style={styles.header}>
            {/* Left Section: Back + Dentist */}
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={onBackPress}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveTab('Dentist')} style={styles.tabWrapper}>
                    <Text style={[styles.headerText, activeTab === 'Dentist' && styles.activeTab]}>
                        Dentist
                    </Text>
                    {
                        activeTab === 'Dentist' ?
                            <FontAwesome name="dot-circle-o" size={20} color={Colors.primary} style={{ marginLeft: 5 }} />
                            :
                            <Icon name="circle-outline" size={20} color={Colors.primary} style={{ marginLeft: 5 }} />
                    }
                </TouchableOpacity>
            </View>

            {/* Right Section: Clinic */}
            <TouchableOpacity onPress={() => setActiveTab('Clinic')} style={[styles.tabWrapper, styles.clinicTab]}>
                <Text style={[styles.headerText, activeTab === 'Clinic' && styles.activeTab]}>
                    Clinic
                </Text>
                {
                    activeTab === 'Clinic' ?
                        <FontAwesome name="dot-circle-o" size={20} color={Colors.primary} style={{ marginLeft: 5 }} />
                        :
                        <Icon name="circle-outline" size={20} color={Colors.primary} style={{ marginLeft: 5 }} />
                }
            </TouchableOpacity>
        </View>
    );
};

export default CommonHeaderWithTabs;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', // This pushes left and right sides
        alignItems: 'center',
        backgroundColor: '#303234',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        opacity: 0.6,
    },
    activeTab: {
        opacity: 1,
    },
    clinicTab: {
        position: 'absolute',
        right: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
