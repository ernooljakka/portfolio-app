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

      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = {
        username: action.payload.username,
        id: action.payload.id,
      };
      state.token = action.payload.token;
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

        const userData = {
          token: action.payload.token,
          username: action.payload.user.username,
          id: action.payload.user.id,
        };

        state.user = {
          username: userData.username,
          id: userData.id,
        };

        state.token = userData.token;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(userData));
      })

      // LOGIN ERROR
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
