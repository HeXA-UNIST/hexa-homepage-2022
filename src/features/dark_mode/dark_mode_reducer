import { createSlice } from '@reduxjs/toolkit'

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: false,
    reducers: {
        setDarkMode: (state) => {
            state = true;
        },
        setLightMode: (state) => {
            state = false;
        },
    }
});

export const { setDarkMode, setLightMode } = darkModeSlice.actions;

export const selectIsDarkMode = (state) => state.darkMode;

export default darkModeSlice.reducer;