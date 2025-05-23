import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // For 'close' icon
import Colors from '../theme/Colors'; // Your Colors file
import InputBox from './InputBox';
import { useFocusEffect } from '@react-navigation/native';

const CommonContactModal = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [patientName, setPatientName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    useEffect(() => {
        if (!visible) {
            setPatientName('');
            setMobileNumber('');
        }
    }, [visible]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="closecircleo" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Get Doctor Number</Text>

                    {/* Input Fields */}
                    <InputBox
                        label="Patient Name"
                        placeholder="Please Enter full name here"
                        value={patientName}
                        onChangeText={setPatientName}
                    />

                    <InputBox
                        label="Mobile Number"
                        placeholder="Please enter your mobile number"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        keyboardType="phone-pad"
                        maxLength={10}
                    />

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitButton} onPress={() => {
                        onSubmit({ patientName, mobileNumber });  // first send data up
                        setPatientName('');                       // then reset
                        setMobileNumber('');
                    }}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CommonContactModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'left',
        color: '#303234',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#f5cd00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
