import {createSlice} from "@reduxjs/toolkit";

const initialUsers = {
    users: [
        {
            id: 1,
            name: "Nymul Islam",
            phone: "01786287789",
            email: "towkir1997islam@gmail.com",
            address: "Dhaka, Bangladesh"
        }
    ],
};

export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsers,
    reducers: {
        showUsers: (state) => state,

        addUser: (state, action) => {
            state.users.push(action.payload);
        },

        updateUser: (state, action) => {
            const {id, name, email, phone, address} = action.payload;

            const isUserExist = state.users.filter((user) => user.id === id);

            if ( isUserExist ) {
                isUserExist[0].name = name;
                isUserExist[0].email = email;
                isUserExist[0].phone = phone;
                isUserExist[0].address = address;
            }

        },

        deleteUser: (state, action) => {
            const id = action.payload;
            state.users = state.users.filter( user => user.id !== id );
        },
    },
});

export const { showUsers, addUser, deleteUser, updateUser } = usersSlice.actions;

export default usersSlice.reducer;