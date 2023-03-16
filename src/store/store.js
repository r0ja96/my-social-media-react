//Dependencias
import { configureStore } from "@reduxjs/toolkit";

//Reducers
import lastAccountsReducer from "./reducers/lastAccountsReducer";
import friendsReducer from "./reducers/friendsReducer";

export const store = configureStore({
    reducer: {
        lastAccounts: lastAccountsReducer,
        friends: friendsReducer
    }
});