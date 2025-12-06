import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
  },
  reducers: {
    setMovies: (state, action) => {
      state.items = action.payload;
    },
    addMovie: (state, action) => {
      state.items.push(action.payload);
    },
    updateMovie: (state, action) => {
      const index = state.items.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeMovie: (state, action) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
  },
});

export const { setMovies, addMovie, updateMovie, removeMovie } =
  movieSlice.actions;
export default movieSlice.reducer;
