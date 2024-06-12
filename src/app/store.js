import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../fetaures/users/UsersSlice";

const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
    },
});

export default store;