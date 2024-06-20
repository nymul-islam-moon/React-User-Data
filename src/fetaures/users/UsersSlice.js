import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    users: [],
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        // set the users array
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        // add a new user
        addUser: (state, action) => {
            state.users.push(action.payload);
        },

        // update an existing user
        updateUser: (state, action) => {
            const { id, name, email, phone, address } = action.payload;
            const userIndex = state.users.findIndex((user) => user.id === id);

            if (userIndex !== -1) {
                state.users[userIndex] = { id, name, email, phone, address };
            }
        },


        // delete a user by id
        deleteUser: (state, action) => {
            const id = action.payload;
            state.users = state.users.filter((user) => user.id !== id);
        },
    },
});

// export actions and reducer
export const { addUser, deleteUser, updateUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer;