import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import STATUS from "../../constants";

const initialState = {
  movieList: [],
  loading: STATUS.IDLE,
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c6272106eamsh57e731f9bb54416p121c1ejsn4dfc648bd5d1",
      "X-RapidAPI-Host": "mdblist.p.rapidapi.com",
    },
  };

  const data = await fetch(
    "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies",
    options
  ).then((data) => data.json());
  return data;
});

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movieList.push(action.payload);
      state.loading = STATUS.SUCCESS;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = STATUS.FAILED;
      state.error = action.payload;
    });
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = STATUS.PENDING;
    });
  },
});

// export {} = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
