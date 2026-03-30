import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";

// GET ALL USERS
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return await userService.getAllUsers();
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch users");
  }
});

// GET USER BY ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      return await userService.getUserById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || "User not found");
    }
  }
);

// GET CURRENT USER (/me)
export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      userService.setToken(token);

      return await userService.getMe();
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch current user");
    }
  }
);

// UPDATE USERNAME
export const updateUsername = createAsyncThunk(
  "users/updateUsername",
  async (username, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      userService.setToken(token);

      return await userService.updateUsername(username);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update username");
    }
  }
);

// UPDATE BIO
export const updateBio = createAsyncThunk(
  "users/updateBio",
  async (bio, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      userService.setToken(token);

      return await userService.updateBio(bio);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update bio");
    }
  }
);

const initialState = {
  users: [],
  currentUser: null,
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===== FETCH ALL USERS =====
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH USER BY ID =====
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      // ===== CURRENT USER =====
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      // ===== UPDATE USERNAME =====
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      // ===== UPDATE BIO =====
      .addCase(updateBio.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export default userSlice.reducer;
