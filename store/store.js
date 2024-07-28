import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favorite";
import contactsReducer from "./contacts";

export const store = configureStore({
  reducer: {
    favoriteContact: favoriteReducer,
    contacts: contactsReducer,
  },
});
