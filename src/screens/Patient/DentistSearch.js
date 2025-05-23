import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import SettingsContainer from '../../components/SettingsContainer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../theme/Colors';
import CitySelector from '../../components/CitySelector';
import CommonButton from '../../components/CommonButton';
import CommonDropdown from '../../components/CommonDropdown';

const locationList = [
    { label: 'Area 1', value: 'area1' },
    { label: 'Area 2', value: 'area2' },
    { label: 'Area 3', value: 'area3' },
];


const DentistSearch = () => {
    const navigation = useNavigation();
    const [showCitySelector, setShowCitySelector] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);



    const handleCityPress = () => {
        setShowCitySelector(prev => !prev);
    };

    useFocusEffect(
        React.useCallback(() => {
            setShowCitySelector(false);
            setSelectedCity('');
            setSelectedLocation(null);
        }, [])
    );

    const renderContent = () => (
        <View style={styles.innerContent}>
            <SettingsContainer
                title={selectedCity ? selectedCity : 'City'}
                onPress={handleCityPress}
                containerStyle={[styles.containerStyle, { marginTop: 50 }]}
            />

            {showCitySelector && (
                <View>
                    <CitySelector onCitySelect={(city) => {
                        setSelectedCity(city);
                        setShowCitySelector(false); // hide after selection
                    }} />
                </View>
            )}

                <CommonDropdown
                    data={locationList}
                    value={selectedLocation}
                    onChange={(item) => {
                        setSelectedLocation(item.value);
                    }}
                    placeholder={selectedLocation
                        ? locationList.find(item => item.value === selectedLocation)?.label
                        : 'Location Wise'}
                />

            <SettingsContainer
                title="Problem Wise"
                onPress={() => ''}
                containerStyle={styles.containerStyle}
            />

            <CommonButton
                title="Search"
                colors={['#303234', '#626364']}
                titleStyle={{ color: Colors.black }}
                onPress={() => navigation.navigate('dentistClinicList')}
                style={[styles.containerStyle, { marginTop: 50, backgroundColor: Colors.primary }]}
            />
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <CustomHeader
                title="Search According to you"
                leftIconType="back"
                barStyle="light-content"
            />
            <FlatList
                data={[]}
                renderItem={null}
                ListHeaderComponent={renderContent}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />

        </View>
    );
};

export default DentistSearch;


const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 30,
    },
    innerContent: {
        flexGrow: 1,
    },
    containerStyle: {
        width: wp(90),
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: Colors.onPrimary,
        marginTop: 30,
    },
});
