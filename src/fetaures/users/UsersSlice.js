import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    users: [],
};

// actions
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        // set the users array
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        // delete a user by id
        deleteUser: (state, action) => {
            const id = action.payload;
            state.users = state.users.filter((user) => user.id !== id);
        },
    },
});

// export actions and reducer
export const { deleteUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer;