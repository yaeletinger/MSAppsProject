import { createSlice } from '@reduxjs/toolkit';

//creating slice for redux
const initValue = {
    hits:"My Hits",
    currentPage: 1,
    maxPages: 0,
    category: "",
    hits:[]
}

const hitsSlice = createSlice({
    name:"hits",
    initialState: initValue,
    reducers: {
        setHits:(state,action) => {
            console.log(action.payload);
            state.hits = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setMaxPages: (state, action) => {
            state.maxPages = action.payload;
        }
    }
})

export const {setHits, setCurrentPage, setMaxPages} = hitsSlice.actions;
export default hitsSlice.reducer