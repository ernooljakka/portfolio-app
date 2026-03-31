import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-lg font-bold hover:text-gray-300">
        Portfolio App
      </Link>

      <button className="bg-gray-700 font-bold hover:bg-gray-600 px-4 py-2 rounded-lg transition">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
