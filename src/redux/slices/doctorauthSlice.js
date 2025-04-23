import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userType: null,
};

const doctorauthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action) => {
        console.log("hello",action);
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.userType = null;
    },
    loadFromStorage: (state, action) => {
      state.user = action.payload; // Restore user from AsyncStorage
    },
  },
});

export const { setData, updateProfile, logout, loadFromStorage } = doctorauthSlice.actions;
export default doctorauthSlice.reducer;

