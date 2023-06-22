import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  contactList: [],
  loading: false,
  fetched: false,
  error: null,
};

export const getContacts = createAsyncThunk(
  "contact/getList",
  async (_, thunkAPI) => {
    try {
      const user = thunkAPI.getState().userLogin.userInfo;

      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios(`/api/contact/user/${user._id}`, config);

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

const contactGetByUser = createSlice({
  name: "contactList",
  initialState,
  reducers: {
    getContactsReset: (state) => {
      state.contactList = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contactList = action.payload;
        state.fetched = true;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { getContactsReset } = contactGetByUser.actions;
export default contactGetByUser.reducer;
