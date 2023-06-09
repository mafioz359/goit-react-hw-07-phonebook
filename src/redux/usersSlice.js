import { createSlice } from '@reduxjs/toolkit';
import { addContact, deliteContact, fetchContacts } from './operations';

const usersSlice = createSlice({
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  name: 'users',
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: state => {
      state.isLoading = true;
    },
    [addContact.pending](state) {
      state.contacts.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [deliteContact.pending](state) {
      state.contacts.isLoading = true;
    },
    [deliteContact.fulfilled](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.contacts.items.splice(index, 1);
    },
    [deliteContact.rejected](state, action) {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
  },
});
export const usersReducer = usersSlice.reducer;
export const { setFilter } = usersSlice.actions;
// const usersSlice = createSlice({
//   name: 'users',
//   initialState: userInitialState,
//   reducers: {
//     deliteReducer: (state, { payload }) => {
//       state.contacts = state.contacts.filter(user => user.name !== payload);
//     },
//     searchReducer: (state, { payload }) => {
//       state.filter = payload;
//     },
//     createUsers: (state, { payload }) => {
//       console.log(payload);
//       state.contacts.push(payload);
//     },
//   },
// });

// export const { createReducer, deliteReducer, searchReducer, createUsers } =
//   usersSlice.actions;
