import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: []
}

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        //Fetch Books
        setBooks: (state, action) => {
            state.books = action.payload;
        }
    }
});

export const { setBooks } = booksSlice.actions;

export default booksSlice.reducer;