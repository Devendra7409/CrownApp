import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../../components/CustomHeader';
import SearchBar from '../../components/SearchBar';
import SymptomCard from '../../components/SymptomCard';
import SpecialistCard from '../../components/SpecialistCard';
import Colors from '../../theme/Colors';
import AppointmentCard from '../../components/AppointmentCard';

const MOCK_SYMPTOMS = [
  { id: '1', title: 'Tooth Pain', icon: require('../../assets/book_my_appointment.png') },
  { id: '2', title: 'Cavity', icon: require('../../assets/book_my_appointment.png') },
  { id: '3', title: 'Gum Disease', icon: require('../../assets/book_my_appointment.png') },
  { id: '4', title: 'Bad Breath', icon: require('../../assets/book_my_appointment.png') },
  { id: '5', title: 'Sensitivity', icon: require('../../assets/book_my_appointment.png') },
  { id: '6', title: 'Wisdom Tooth', icon: require('../../assets/book_my_appointment.png') },
  { id: '7', title: 'Bleeding', icon: require('../../assets/book_my_appointment.png') },
  { id: '8', title: 'fever', icon: require('../../assets/book_my_appointment.png') },
  { id: '9', title: 'Others', icon: require('../../assets/book_my_appointment.png') },
];

const MOCK_SPECIALISTS = [
  {
    id: '1',
    name: 'Dr. John Doe',
    specialty: 'Orthodontist',
    image: require('../../assets/book_online_consultent.png'),
    rating: 4.5,
    reviews: 120
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    specialty: 'Periodontist',
    image: require('../../assets/book_online_consultent.png'),
    rating: 4.8,
    reviews: 150
  },
  {
    id: '3',
    name: 'Dr. Mike Wilson',
    specialty: 'Endodontist',
    image: require('../../assets/book_online_consultent.png'),
    rating: 4.6,
    reviews: 98
  },
  {
    id: '4',
    name: 'Dr. Sarah Brown',
    specialty: 'Oral Surgeon',
    image: require('../../assets/book_online_consultent.png'),
    rating: 4.9,
    reviews: 200
  },
];

const PatientHomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSymptomPress = (symptom) => {
    console.log('Symptom pressed:', symptom);
  };

  const handleSpecialistPress = (specialist) => {
    console.log('Specialist pressed:', specialist);
  };

  const renderSymptomItem = ({ item }) => (
    <SymptomCard
      title={item.title}
      icon={item.icon}
      onPress={() => handleSymptomPress(item)}
    />
  );

  const renderSpecialistItem = ({ item }) => (
    <SpecialistCard
      name={item.name}
      specialty={item.specialty}
      image={item.image}
      onPress={() => handleSpecialistPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title=""
        onMenuPress={() => navigation.openDrawer()}
        showProfile={true}
        onNotificationPress={()=>navigation.navigate('notification')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar
          placeholder="Search doctors, clinics..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          containerStyle={styles.searchBar}
        />

        <View style={styles.appointmentCardsContainer}>
          <AppointmentCard
            title="Book My Appointment"
            image={require('../../assets/book_my_appointment.png')}
            onPress={() => navigation.navigate('Appointments')}
          />
          <AppointmentCard
            title="Book Online Consultation"
            image={require('../../assets/book_online_consultent.png')}
            onPress={() => navigation.navigate('BookOnlineCunsultant')}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionTitle}>Symptoms</Text>
          </View>
          <FlatList
            data={MOCK_SYMPTOMS}
            renderItem={renderSymptomItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.symptomsContainer}
            columnWrapperStyle={styles.symptomRow}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionTitle}>Specialist</Text>
          </View>
          <FlatList
            data={MOCK_SPECIALISTS}
            renderItem={renderSpecialistItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialistsContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: wp(1),
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: wp(2.5),
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  searchBar: {
    marginVertical: hp(2),
  },
  appointmentCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  sectionContainer: {
    marginBottom: hp(3),
  },
  titleWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginHorizontal: -wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: '#FFFFFF',
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#333',
  },
  symptomsContainer: {
    paddingHorizontal: wp(1),
  },
  symptomRow: {
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  specialistsContainer: {
    paddingLeft: wp(1),
    paddingRight: wp(4),
  },
});

export default PatientHomeScreen;
