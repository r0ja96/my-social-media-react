import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import lastAccountsApi from "../../api/lastAccountsApi";

const initialState = {
    data: [],
    status: null,
    message: null,
}

export const lastAccounts = createAsyncThunk(
    'lastAccounts/fetch',
    async () => {
        return await lastAccountsApi();
    }
)

export const lastAccountsSlice = createSlice({
    name:'lastAccounts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(lastAccounts.fulfilled, (state, action) =>{
            state.data = action.payload.data;
            state.status = action.payload.status;
            state.message = action.payload.message;
        })
    }
    
});

export const selectLastAccounts = (state) => state.lastAccounts;

export default lastAccountsSlice.reducer;