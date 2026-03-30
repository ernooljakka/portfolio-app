import axios from "axios";

const baseUrl = "http://localhost:5000/api/projects";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Get projects for the logged user

const getUserProjects = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

// Get all projects with filters

const getAllProjects = async (filters = {}) => {
  const response = await axios.get(`${baseUrl}/all`, {
    params: filters,
    paramsSerializer: {
      indexes: null,
    },
  });

  return response.data;
};

// Create project
const createProject = async (projectData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(baseUrl, projectData, config);
  return response.data;
};

// Update project
const updateProject = async (id, updatedData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.put(`${baseUrl}/${id}`, updatedData, config);

  return response.data;
};

// Delete project
const deleteProject = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  setToken,
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
};
