import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data; // { token, username, id }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // LOGIN SUCCESFUL
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          username: action.payload.user.username,
          id: action.payload.user.id,
        };
        state.token = action.payload.token;

        // Save token to localstorage for later use
        localStorage.setItem("token", action.payload.token);
      })

      // LOGIN ERROR
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
