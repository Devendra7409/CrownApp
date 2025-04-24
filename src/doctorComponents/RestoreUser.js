import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserFromStorage } from '../redux/slices/authSlice';

const RestoreUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          dispatch(loadUserFromStorage(JSON.parse(userData))); // Restore user to Redux
        }
      } catch (error) {
        console.error("Failed to restore user data", error);
      }
    };

    restoreUser();
  }, [dispatch]);

  return null; // This component does not render anything
};

export default RestoreUser;
