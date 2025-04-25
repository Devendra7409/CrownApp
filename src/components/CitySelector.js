import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign'; // for the search icon

const popularCities = ["Mumbai", "Delhi", "Hyderabad", "Pune", "Bangalore"];
const otherCities = ["Other Cities", "Other Cities1", "Other Cities2", "Other Cities3", "Other Cities4"];

const CitySelector = ({ onCitySelect }) => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchText, setSearchText] = useState('');


    const toggleCitySelection = (city) => {
        setSelectedCity(prev => (prev === city ? null : city));
        onCitySelect && onCitySelect(city);
    };

    const filteredOtherCities = otherCities.filter(city =>
        city.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Popular Cities Header */}
            <Text style={styles.header}>Popular Cities</Text>
            <FlatList
                horizontal
                data={popularCities}
                keyExtractor={(item) => item}
                contentContainerStyle={{ paddingHorizontal: wp(4) }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleCitySelection(item)} style={styles.cityItem}>
                        <View style={[
                            styles.cityCircle,
                            selectedCity === item && styles.cityCircleSelected
                        ]} />
                        <Text style={styles.cityName}>{item}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />

            {/* Conditionally render rest of the component */}
            {(
                <View>
                    <Text style={styles.subHeader}>Other Cities</Text>

                    {/* Search bar */}
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Here"
                            placeholderTextColor="#FDC500"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        <Icon name="search1" size={20} color="#000" />
                    </View>

                    {/* List of Other Cities */}
                    <FlatList
                        data={filteredOtherCities}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => toggleCitySelection(item)}
                                style={[
                                    styles.cityListItem,
                                    index % 2 === 0 && { backgroundColor: '#eee' },
                                    selectedCity === item && styles.cityListItemSelected
                                ]}
                            >
                                <Text style={{ color: selectedCity === item ? '#007AFF' : '#000' }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    
                </View>
            )}
        </View>
    );
};

export default CitySelector;

const styles = StyleSheet.create({
    container: {
        margin: wp(3),
        borderWidth: 1,
        borderColor: '#FDC500',
        borderRadius: 10,
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    header: {
        textAlign: 'center',
        backgroundColor: '#d3d3d3',
        fontWeight: 'bold',
        paddingVertical: 8
    },
    subHeader: {
        textAlign: 'center',
        backgroundColor: '#d3d3d3',
        fontWeight: 'bold',
        paddingVertical: 8,
        marginTop: 10
    },
    cityItem: {
        alignItems: 'center',
        marginHorizontal: wp(2),
    },
    cityCircle: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: '#ccc',
        marginBottom: 5
    },
    cityCircleSelected: {
        borderColor: '#007AFF',
        borderWidth: 2
    },
    cityName: {
        fontSize: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FDC500',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        margin: wp(4),
        backgroundColor: '#fff',
        height: 40
    },
    searchInput: {
        flex: 1,
        color: '#000'
    },
    cityListItem: {
        padding: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ccc'
    }
});
