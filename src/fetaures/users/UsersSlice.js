import {createSlice} from "@reduxjs/toolkit";

// state
const initialUsers = {
    users: [],
    isLoading: false,
    error: null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsers,
    reducers: {
        showUsers: (state) => state,

        setUsers: ( state, action ) => {
            state.users = action.payload;
        },

        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateLoadingState:(state, action)=>{
            state.isLoading = action.payload
        },

        setError :(state, action)=>{
            state.error =action.payload
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

export const {setError, showUsers,updateLoadingState, addUser, deleteUser, updateUser, setUsers } = usersSlice.actions;

export default usersSlice.reducer;