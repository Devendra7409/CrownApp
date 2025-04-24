import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import actions from different auth slices
import { loadFromStorage as loadDoctorUser } from '../redux/slices/doctorauthSlice';
import { loadUserFromStorage as loadPatientUser } from '../redux/slices/pateientauthSlice';
// import { loadUserFromStorage as loadLabUser } from '../redux/slices/labAuthSlice';

const RestoreUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        console.log("Restoring user data:", userData);
        
        if (userData) {
          const parsedData = JSON.parse(userData);

          switch (parsedData.userType) {
            case 'doctor':
              dispatch(loadDoctorUser(parsedData));
              break;
            case 'patient':
              dispatch(loadPatientUser(parsedData));
              break;
            // case 'lab':
            //   dispatch(loadLabUser(parsedData));
            //   break;
            default:
              console.warn("Unknown userType:", parsedData.userType);
          }
        }
      } catch (error) {
        console.error("Failed to restore user data", error);
      }
    };

    restoreUser();
  }, [dispatch]);

  return null;
};

export default RestoreUser;
