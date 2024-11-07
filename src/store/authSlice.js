import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  theme: 'light',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login : (state,action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout : (state,action) => {
            state.status = false;
            state.userData = null;
        },
        theme : (state,action) => {
            state.theme = action.payload
        }
    }
})
export const {login,logout,theme} = authSlice.actions

export default authSlice.reducer