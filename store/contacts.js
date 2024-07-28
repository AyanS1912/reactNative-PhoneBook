// contacts.js
import { createSlice } from "@reduxjs/toolkit";
import contacts from "../data/data";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    data: contacts,
  },
  reducers: {
    addContact(state, action) {
      state.data.push(action.payload);
    },
    removeContact(state, action) {
      state.data = state.data.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
    updateContact(state, action) {
      const index = state.data.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { addContact, removeContact, updateContact } =
  contactsSlice.actions;
export default contactsSlice.reducer;
