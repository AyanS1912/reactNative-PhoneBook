import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    addFav: (state, action) => {
      state.ids.push(action.payload.id);
    },

    remFav: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload.id);
    },
  },
});

export default favoriteSlice.reducer;
export const addFavorite = favoriteSlice.actions.addFav;
export const removeFavorite = favoriteSlice.actions.remFav;
