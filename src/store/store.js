//Dependencias
import { configureStore } from "@reduxjs/toolkit";

//Reducers
import lastAccountsReducer from "./reducers/lastAccountsReducer";
import friendsReducer from "./reducers/friendsReducer";
import friendsPostsReducer from "./reducers/friendsPostsReducer";

export const store = configureStore({
    reducer: {
        lastAccounts: lastAccountsReducer,
        friends: friendsReducer,
        friendsPosts: friendsPostsReducer
    }
});