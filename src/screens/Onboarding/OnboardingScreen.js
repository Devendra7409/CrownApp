import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    text: 'Consult only with\na Dentist you trust',
    image: require('../../assets/splash_1.png'),
  },
  {
    id: '2',
    text: 'Find a lot of Specialized\n Dentists in one place',
    image: require('../../assets/splash_2.png'),
  },
  {
    id: '3',
    text: 'join the network of\nDental labs',
    image: require('../../assets/splash_3.png'),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('isFirstLaunch', 'false');
      navigation.replace('FinalOnboardingScreen'); // Navigate to login/signup screen
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      {item.id === '2' ? (
        <>
          <Text style={[styles.text, styles.topText]}>{item.text}</Text>
          <Image source={item.image} style={styles.image} />
        </>
      ) : (
        <>
          <Image source={item.image} style={styles.image} />
          <Text style={[styles.text, styles.bottomText]}>{item.text}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Next Button */}
      {
        currentIndex === slides.length - 1 &&
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{'Get Started'}</Text>
        </TouchableOpacity>
      }

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff' },
  slide: { width, justifyContent: 'center', alignItems: 'center' },
  image: { width: '95%', height: height * 0.9, resizeMode: 'contain' },
  text: {
    fontSize: width * 0.045, // 4.5% of screen width
    textAlign: 'center',
    marginBottom: height * 0.1, // 8% of screen height
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: width * 0.05, // 5% of screen width
    lineHeight: width * 0.06 // 6% of screen width for line spacing
  },
  topText: {
    marginTop: height * 0.05, // 5% of screen height
    marginBottom: height * 0.02, // 2% of screen height
    top: 50
  },
  bottomText: {
    bottom: 50, // Move text up by 10px
  },

  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: height * 0.06, // 6% of screen height
    alignSelf: 'center',
    bottom: 60
  },
  dot: {
    width: width * 0.02, // 2% of screen width
    height: width * 0.02, // 2% of screen width
    borderRadius: width * 0.01, // 1% of screen width
    backgroundColor: '#ccc',
    marginHorizontal: width * 0.01 // 1% of screen width
  },
  activeDot: { backgroundColor: '#FFC107' },

  nextButton: {
    position: 'absolute',
    bottom: 50,
    right: 15,
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
});
