import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DentistClinicCard from '../../components/DentistClinicCard';
import CommonHeaderWithTabs from '../../components/CommonHeaderWithTabs';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonContactModal from '../../components/CommonContactModal';
import BookAppointmentModal from '../../components/BookAppointmentModal';

const filterData = ['Specialization', 'Gender', 'Rating'];

const dummyList = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
];

const myDateList = [
    { day: 'Friday', date: '15 Mar', timeSlots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'] },
    { day: 'Saturday', date: '16 Mar', timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM'] },
    { day: 'Monday', date: '18 Mar', timeSlots: ['09:00 AM', '09:30 AM', '10:00 AM'] },
];

const DentistClinicList = () => {
    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState('Dentist');
    const [modalVisible, setModalVisible] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
    const [selectedDentist, setSelectedDentist] = useState(null);




    const openAppointmentModal = () => {
        setAppointmentModalVisible(true);
    };

    const closeAppointmentModal = () => {
        setAppointmentModalVisible(false);
    };



    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    // When user clicks Submit
    const handleSubmit = (data) => {
        console.log('Submitted Data:', data);
        setSubmittedData(data);
        closeModal(); // Close the modal after submit
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <CommonHeaderWithTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onBackPress={() => navigation.goBack()}
            />
            {/* Filters */}
            <View style={styles.filterRow}>
                {filterData.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.filterButton}>
                        <Text style={styles.filterText}>{item}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.roundButton}>
                    <Ionicons name="chevron-back" size={18} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.roundButton}>
                    <Ionicons name="filter" size={18} color="#000" />
                </TouchableOpacity>
            </View>


            {/* List */}
            {activeTab === 'Dentist' ? (
                <>
                    <FlatList
                        data={dummyList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={() =>
                            <DentistClinicCard
                                GetNumber={openModal}
                                OnPress={() => {
                                    setSelectedDentist({ name: 'Dentist Name', address: 'Address Line' });
                                    openAppointmentModal();
                                }}
                            />
                        }
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            ) : (
                <>
                    <FlatList
                        data={dummyList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={() => <DentistClinicCard />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}

            {/* Common Modal */}
            <CommonContactModal
                visible={modalVisible}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />

            {/* Appointment Modal */}
            <BookAppointmentModal
                visible={appointmentModalVisible}
                onClose={closeAppointmentModal}
                selectedDentist={selectedDentist}
                clinicList={[{ id: 1, name: 'Clinic 1' }, { id: 2, name: 'Clinic 2' }]} // Pass your clinics
                dateList={myDateList}
            />


        </View>
    );
};

export default DentistClinicList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#303234',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    filterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10,
    },
    filterButton: {
        backgroundColor: '#f5cd00',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    roundButton: {
        backgroundColor: '#f5cd00',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    arrowButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f5cd00',
        borderRadius: 20,
        padding: 8,
        marginRight: 10,
    },
    filterIconButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
        padding: 8,
    },
});
