import axios from "axios";

const baseUrl = "http://localhost:3000/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Get all users
const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Create user

const createUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

// Get user by ID

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// Getme

const getMe = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/me`, config);
  return response.data;
};

// Update username

const updateUsername = async (newUsername) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/username`, { username: newUsername }, config);

  return response.data;
};

// Update bio

const updateBio = async (newBio) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/bio`, { bio: newBio }, config);

  return response.data;
};

// Delete user

const deleteUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUsername,
  getMe,
  setToken,
  updateBio,
  deleteUser,
};
