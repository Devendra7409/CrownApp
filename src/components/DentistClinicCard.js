import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../theme/Colors';

const DentistClinicCard = (props) => {
    return (
        <View style={styles.card}>
            {/* Dentist Info */}
            <View style={styles.row}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/60' }}
                    style={styles.profileImage}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.name}>Dentist Name</Text>
                    <Text style={styles.detail}>Degree</Text>
                    <Text style={styles.detail}>Specialization</Text>
                    <Text style={styles.detail}>Years of Experience</Text>
                    <Text style={styles.detail}>Full Address</Text>
                    <Text style={styles.feedback}>
                        <Icon name="chat" size={15} color="#f5cd00" /> 67 Feedback
                    </Text>
                </View>
                {/* Rating */}
                <View style={styles.rightIconsRow}>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={16} color="#fff" />
                        <Text style={styles.ratingText}>4.5</Text>
                    </View>

                    <TouchableOpacity  onPress={props.GetNumber}>
                        <Icon name="phone" size={30} color="#f5cd00" />
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <Icon name="location-on" size={30} color="#f5cd00" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Book Appointment */}
            <TouchableOpacity style={styles.bookButton} onPress={props.OnPress}>
                <Text style={styles.bookText}>Book appointment</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DentistClinicCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ccc',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    detail: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    feedback: {
        fontSize: 15,
        color: '#f5cd00',
        marginTop: 5,
    },
    rightIconsRow: {
        alignItems: 'center',
        justifyContent:'space-between',
        gap: 10,  
      },
    ratingContainer: {
        backgroundColor: '#f5cd00',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '800',
        color: Colors.background,
    },
    bookButton: {
        marginTop: 15,
        backgroundColor: '#f5cd00',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
    },
    bookText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
});
