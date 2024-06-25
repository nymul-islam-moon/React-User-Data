import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../fetaures/users/UsersSlice";
import booksReducer from "../fetaures/books/BooksSlice";

const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
        booksReducer: booksReducer,
    },
});

export default store;