import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getFriendsApi from "../../api/getFriendsApi";

const initialState = {
    data: [],
    status: null,
    message: null,
}

export const friends = createAsyncThunk(
    'friends/fetch',
    async () => {
        return await getFriendsApi();
    }
)

export const friendsSlice = createSlice({
    name:'friends',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(friends.fulfilled, (state, action) =>{
            state.data = action.payload.data;
            state.status = action.payload.status;
            state.message = action.payload.message;
        })
    }
    
});

export const selectFriends = (state) => state.friends;

export default friendsSlice.reducer;