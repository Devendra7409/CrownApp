import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import doctorAuthReducer from './slices/doctorauthSlice';
import patientAuthReducer from './slices/pateientauthSlice';

const rootReducer = combineReducers({
  auth: authSlice,              // Handles selectedAuthType
  patientAuth: patientAuthReducer,
  doctorAuth: doctorAuthReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
