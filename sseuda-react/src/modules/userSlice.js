import { createSlice } from '@reduxjs/toolkit';
import React from 'react'

const initialState = {
    navBgColor: '#F5C3A4',
    btnBgColor: '#F19A65',
    bgColor: '#fff'
};

const userSlice = createSlice({
    
    name: 'user',
    initialState,
    reducers: {
        setNavBgColor: (state, action) =>{
            state.navBgColor = action.payload;
        },
        setBtnBgColor: (state, action) =>{
            state.btnBgColor = action.payload;
        },
        setBgColor: (state, action) =>{
            state.bgColor = action.payload;
        },
    },
});

export const { setNavBgColor, setBtnBgColor, setBgColor } = userSlice.actions;
export default userSlice.reducer;