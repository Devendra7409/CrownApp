import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userType: null,
};

const pateientauthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logoutUser: (state) => {
      state.user = null;
      state.userType = null;
    },
    loadUserFromStorage: (state, action) => {
      state.user = action.payload; // Restore user from AsyncStorage
    },
  },
});

export const { setUserType, setUser, updateUserProfile, logoutUser, loadUserFromStorage } = pateientauthSlice.actions;
export default pateientauthSlice.reducer;

