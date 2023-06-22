import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { contactInfo: {}, loading: false, error: null };

export const addContact = createAsyncThunk(
  "contact/add",
  async (contactData, thunkAPI) => {
    try {
      const user = thunkAPI.getState().userLogin.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/contact", contactData, config);

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

const contactAdd = createSlice({
  name: "contactInfo",
  initialState,
  reducers: {
    addReset: (state) => {
      state.contactInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contactInfo = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addReset } = contactAdd.actions;
export default contactAdd.reducer;
