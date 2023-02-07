import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

import STATUS from "../../constants";

const initialState = {
  authUser: {},
  loading: STATUS.IDLE,
  error: null,
};

export const fetchAuthUser = createAsyncThunk(
  "authUser/fetchAuthUser",
  async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    return authUser;
  }
);

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      state.authUser = action.payload;
      state.loading = STATUS.SUCCESS;
    });
    builder.addCase(fetchAuthUser.rejected, (state, action) => {
      state.loading = STATUS.FAILED;
      state.error = action.payload;
    });
    builder.addCase(fetchAuthUser.pending, (state, action) => {
      state.loading = STATUS.PENDING;
    });
  },
});

export const authUserReducer = authUserSlice.reducer;
