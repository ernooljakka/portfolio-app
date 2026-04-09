import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import projectService from "../services/projectService";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    projectService.setToken(null);
  };

  return (
    <nav className="bg-gray-900 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-white text-xl font-bold">
        Portfolio app
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-300">{user.username}</span>

            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
