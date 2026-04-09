import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ username, password })).unwrap();

      navigate("/");
    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-900 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded bg-gray-800 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-800 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-400 text-m">{error.error}</p>}
      </form>
    </div>
  );
};

export default Login;
