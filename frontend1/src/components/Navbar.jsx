import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition duration-200">
          Task Manager
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-200 transition duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="hover:text-blue-200 transition duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition duration-200 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="hover:text-blue-200 transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition duration-200 text-left"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;