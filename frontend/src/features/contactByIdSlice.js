import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { contact: {}, loading: false, error: null };

export const getContactById = createAsyncThunk(
  "contact/getById",
  async (id, thunkAPI) => {
    try {
      const user = thunkAPI.getState().userLogin.userInfo;

      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios(`/api/contact/${id}`, config);

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

const contactGetById = createSlice({
  name: "contact",
  initialState,
  reducers: {
    getContactByIdReset: (state) => {
      state.contact = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { getContactByIdReset } = contactGetById.actions;
export default contactGetById.reducer;
