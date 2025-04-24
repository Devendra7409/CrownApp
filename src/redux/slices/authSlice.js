import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    selectedAuthType: null, // 'patient' or 'doctor'
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAuthType: (state, action) => {
        state.selectedAuthType = action.payload;
      },
    },
  });
  
  export const { setAuthType } = authSlice.actions;
  export default authSlice.reducer;
  