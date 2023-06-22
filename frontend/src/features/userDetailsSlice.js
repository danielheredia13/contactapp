import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const details = createAsyncThunk("user/details", async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().userLogin.userInfo;

    const config = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios("/api/users/profile", config);

    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

const userDetails = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.userInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(details.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(details.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(details.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = userDetails.actions;

export default userDetails.reducer;
