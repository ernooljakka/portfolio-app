import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "../../services/projectService";

// GET ALL PROJECTS (with filters)
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (filters, { rejectWithValue }) => {
    try {
      const data = await projectService.getAllProjects(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch projects");
    }
  }
);

// GET PROJECTS FOR LOGGED IN USER
export const fetchUserProjects = createAsyncThunk(
  "projects/fetchUserProjects",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      projectService.setToken(token);

      const data = await projectService.getUserProjects();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user projects");
    }
  }
);

// CREATE PROJECT
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      projectService.setToken(token);

      const data = await projectService.createProject(projectData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create project");
    }
  }
);

// UPDATE PROJECT
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, updatedData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      projectService.setToken(token);
      const data = await projectService.updateProject(id, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update project");
    }
  }
);

// DELETE PROJECT
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      projectService.setToken(token);
      await projectService.deleteProject(id);
      return id; // return id so it can be removed from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete project");
    }
  }
);

const initialState = {
  projects: [],
  userProjects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ALL PROJECTS
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER PROJECTS
      .addCase(fetchUserProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload;
      })
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
        state.userProjects.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateProject.fulfilled, (state, action) => {
        const updateList = (list) => {
          const index = list.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) list[index] = action.payload;
        };

        updateList(state.projects);
        updateList(state.userProjects);
      })

      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        state.userProjects = state.userProjects.filter((p) => p.id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
