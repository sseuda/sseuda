import { createSlice } from '@reduxjs/toolkit';
import React from 'react'

const initialState = {
    bgColor: '#F5C3A4',
};

const userSlice = createSlice({
    
    name: 'user',
    initialState,
    reducers: {
        setBgColor: (state, action) =>{
            state.bgColor = action.payload;
        },
    },
});

export const { setBgColor } = userSlice.actions;
export default userSlice.reducer;