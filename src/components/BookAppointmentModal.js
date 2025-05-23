import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Colors';

const { width } = Dimensions.get('window');

const BookAppointmentModal = ({ visible, onClose, selectedDentist, clinicList }) => {
    const [activeStep, setActiveStep] = useState(1);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState(null);

    // Sample dummy data for dates + times
    const dateList = [
        { day: 'Friday', date: '15 Mar', timeSlots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'] },
        { day: 'Saturday', date: '16 Mar', timeSlots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'] },
        { day: 'Monday', date: '18 Mar', timeSlots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'] },
    ];

    const renderClinicItem = ({ item }) => (
        <>
            <Text style={styles.clinicName}>{item.name}</Text>
            <View style={styles.clinicCard}>
                <View style={styles.clinicInfo}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.clinicName}>Dental Clinic</Text>
                        <Text style={styles.clinicDetail}>Doctor Name +5</Text>
                        <Text style={styles.clinicDetail}>Full Clinic Address</Text>
                    </View>
                    <View style={styles.rightIcons}>
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={16} color="#fff" />
                            <Text style={styles.ratingText}>4.5</Text>
                        </View>
                    </View>
                    <Icon name="phone" size={30} color="#f5cd00" style={{ marginVertical: 8 }} />
                    <Icon name="location-on" size={30} color="#f5cd00" />
                </View>
            </View>
        </>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Book Appointment</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Dentist Info */}
                    <View style={styles.dentistInfo}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/60' }}
                            style={styles.dentistImage}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.dentistName}>{selectedDentist?.name || 'Dentist'}</Text>
                            <Text style={styles.dentistAddress}>{selectedDentist?.address || 'Address'}</Text>
                        </View>
                    </View>

                    {/* Step Tabs */}
                    <View style={styles.stepTabs}>
                        {[1, 2, 3].map((step) => (
                            <TouchableOpacity
                                key={step}
                                style={[styles.stepButton, activeStep === step && styles.activeStep]}
                                onPress={() => setActiveStep(step)}
                            >
                                <Text style={[styles.stepText, activeStep === step && styles.activeStepText]}>
                                    Step - {step}{'\n'}{step === 1 ? 'Clinic' : step === 2 ? 'Select Date' : 'Basic Details'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>


                    {/* Step Content */}
                    <View style={{ flex: 1 }}>
                        {activeStep === 1 && (
                            <FlatList
                                data={clinicList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderClinicItem}
                                contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                                showsVerticalScrollIndicator={false}
                            />
                        )}

                        {activeStep === 2 && (
                            <View style={styles.step2Container}>
                                {/* Dates List */}
                                <FlatList
                                    data={dateList}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.dateItem,
                                                selectedDateIndex === index && styles.selectedDateItem,
                                            ]}
                                            onPress={() => setSelectedDateIndex(index)}
                                        >
                                            <Text
                                                style={[
                                                    styles.dateDay,
                                                    selectedDateIndex === index && styles.selectedDateDay,
                                                ]}
                                            >
                                                {item.day}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.dateDate,
                                                    selectedDateIndex === index && styles.selectedDateDate,
                                                ]}
                                            >
                                                {item.date}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    ListFooterComponent={() => (
                                        <TouchableOpacity
                                            style={styles.calendarButton}
                                            onPress={() => {
                                                // your open calendar logic here
                                            }}
                                        >
                                            <AntDesign name='calendar' size={20}/>
                                        </TouchableOpacity>
                                    )}
                                />

                                {/* Time Slots Grid */}
                                <FlatList
                                    data={dateList[selectedDateIndex]?.timeSlots || []}
                                    numColumns={3}
                                    contentContainerStyle={{ paddingVertical: 20 }}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.timeSlot,
                                                selectedTime === item && styles.selectedTimeSlot,
                                            ]}
                                            onPress={() => setSelectedTime(item)}
                                        >
                                            <Text
                                                style={[
                                                    styles.timeSlotText,
                                                    selectedTime === item && styles.selectedTimeSlotText,
                                                ]}
                                            >
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}

                        {activeStep === 3 && (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Basic Details Form (Step 3 Content Here)</Text>
                            </View>
                        )}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        {activeStep > 1 && (
                            <TouchableOpacity
                                style={[styles.nextButton, { backgroundColor: '#ccc', flex: 1, marginRight: 5 }]}
                                onPress={() => setActiveStep(prev => prev - 1)}
                            >
                                <Text style={[styles.nextButtonText, { color: '#000' }]}>Previous</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={[styles.nextButton, { flex: 1, marginLeft: activeStep > 1 ? 5 : 0 }]}
                            onPress={() => {
                                if (activeStep < 3) {
                                    setActiveStep(prev => prev + 1);
                                } else {
                                    // Submit Logic Here
                                    console.log('Submit appointment form');
                                    onClose(); // maybe close the modal after submit
                                }
                            }}
                        >
                            <Text style={styles.nextButtonText}>
                                {activeStep === 3 ? 'Submit' : 'Next'}
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </Modal>
    );
};

export default BookAppointmentModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        height: '80%',
        padding: 15,
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    dentistInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    dentistImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
    },
    dentistName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    dentistAddress: {
        fontSize: 12,
        color: '#666',
    },
    stepTabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    stepButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#666',
        marginHorizontal: 5,
        borderRadius: 10,
    },
    stepText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
    },
    activeStep: {
        backgroundColor: '#f5cd00',
    },
    activeStepText: {
        color: '#000',
        fontWeight: 'bold',
    },
    stepContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clinicCard: {
        borderWidth: 1,
        borderColor: '#f5cd00',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    clinicInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    clinicName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    clinicDetail: {
        fontSize: 12,
        color: '#666',
    },
    rightIcons: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingContainer: {
        backgroundColor: '#f5cd00',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 5,
        borderRadius: 6,
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 3,
        fontWeight: 'bold',
        color: '#fff',
    },
    nextButton: {
        backgroundColor: '#f5cd00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    navButton: {
        flex: 1,
        backgroundColor: '#f5cd00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    navButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    step2Container: {
        flex: 1,
        marginTop: 10,
    },
    dateItem: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        backgroundColor: '#ccc'
    },
    selectedDateItem: {
        borderBottomColor: '#f5cd00',
    },
    dateDay: {
        fontSize: 14,
        color: '#000',
    },
    dateDate: {
        fontSize: 12,
        color: '#000',
    },
    timeSlot: {
        flex: 1,
        margin: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f5cd00',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedTimeSlot: {
        backgroundColor: '#f5cd00',
    },
    timeSlotText: {
        fontSize: 14,
        color: '#000',
    },
    selectedTimeSlotText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    step2Container: {
        flex: 1,
        marginTop: 10,
      },
      
      dateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        backgroundColor: '#ccc', // grey by default
        borderRadius: 5,
      },
      
      selectedDateItem: {
        backgroundColor: '#f5cd00', // yellow background when selected
      },
      
      dateDay: {
        fontSize: 14,
        color: '#000',
      },
      
      dateDate: {
        fontSize: 12,
        color: '#000',
      },
      
      selectedDateDay: {
        color: '#fff', // make selected day text white
        fontWeight: 'bold',
      },
      
      selectedDateDate: {
        color: '#fff', // make selected date text white
        fontWeight: 'bold',
      },
      
      calendarButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
      },
});
