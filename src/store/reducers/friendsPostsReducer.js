import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getFriendsPostApi from "../../api/getFriendsPostApi";

const initialState = {
    data: [],
    status: null,
    message: null,
}

export const friendsPosts = createAsyncThunk(
    'friendsPosts/fetch',
    async () => {
        return await getFriendsPostApi();
    }
)

export const friendsPostsSlice = createSlice({
    name: 'friendsPosts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(friendsPosts.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.status = action.payload.status;
            state.message = action.payload.message;
        })
    }

});

export const selectFriendsPosts = (state) => state.friendsPosts;

export default friendsPostsSlice.reducer;