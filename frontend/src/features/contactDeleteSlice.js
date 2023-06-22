import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  loading: false,
  error: null,
};

export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (id, thunkAPI) => {
    try {
      const user = thunkAPI.getState().userLogin.userInfo;

      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.delete(`/api/contact/${id}`, config);

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const contactDelete = createSlice({
  name: "success",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteContact.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactDelete.reducer;
