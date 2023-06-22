import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contactInfo: {},
  loading: false,
  error: null,
};

export const updateContact = createAsyncThunk(
  "contact/update",
  async (contactData, thunkAPI) => {
    try {
      const user = thunkAPI.getState().userLogin.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/contact/${contactData._id}`,
        contactData,
        config
      );

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

const contactUpdate = createSlice({
  name: "contactInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateContact.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contactInfo = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactUpdate.reducer;
