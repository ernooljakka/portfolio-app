import axios from "axios";

const baseUrl = "http://localhost:3000/api/projects";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAuthConfig = () => ({
  headers: token ? { Authorization: token } : {},
});

// GET project by ID
const getProjectById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// GET logged-in user's projects
const getUserProjects = async () => {
  const response = await axios.get(`${baseUrl}/me`, getAuthConfig());
  return response.data;
};

// GET all projects
const getAllProjects = async (filters = {}) => {
  const response = await axios.get(baseUrl, {
    params: filters,
    paramsSerializer: {
      indexes: null,
    },
  });

  return response.data;
};

// CREATE project
const createProject = async (projectData) => {
  const response = await axios.post(baseUrl, projectData, getAuthConfig());
  return response.data;
};

// UPDATE project
const updateProject = async (id, updatedData) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedData, getAuthConfig());
  return response.data;
};

// DELETE project
const deleteProject = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getAuthConfig());
  return response.data;
};

export default {
  setToken,
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
};
