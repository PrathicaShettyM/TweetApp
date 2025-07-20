import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiLogIn,
  FiLogOut,
  FiHome,
  FiSearch,
  FiMessageSquare,
  FiUser,
  FiChevronRight,
  FiChevronLeft,
} from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const menuItems = [
    { label: 'Explore', icon: <FiHome />, path: '/explore' },
    { label: 'Messages', icon: <FiMessageSquare />, path: '/messages' },
    { label: 'Profile', icon: <FiUser />, path: '/profile' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-[linear-gradient(to_bottom_right,#0f2027,#203a43,#2c5364)] text-white shadow-lg transition-all duration-300 ease-in-out ${
          expanded ? 'w-64' : 'w-20'
        } flex flex-col justify-between fixed`}
      >
        <div>
          {/* Toggle button */}
          <div className="flex justify-end p-3">
            <button onClick={() => setExpanded(!expanded)} className="text-gray-200">
              {expanded ? <FiChevronLeft /> : <FiChevronRight />}
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex flex-col space-y-2 px-2 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center text-white hover:bg-green-600 p-2 rounded-lg transition"
              >
                <span className="text-xl">{item.icon}</span>
                {expanded && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <div className="mt-6 px-2">
            <div className="relative">
              <FiSearch className="absolute top-2.5 left-3 text-gray-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className={`bg-transparent text-white pl-10 py-2 pr-3 rounded-full text-sm w-full transition ${
                  expanded ? 'opacity-1000' : 'opacity-10 w-0 p-0 h-0 overflow-hidden'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Auth button */}
        <div className="p-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg w-full justify-center"
            >
              <FiLogOut className="text-xl" />
              {expanded && <span className="ml-2">Logout</span>}
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center text-green-100 bg-green-700 hover:bg-green-600 px-3 py-2 rounded-lg w-full justify-center"
            >
              <FiLogIn className="text-xl" />
              {expanded && <span className="ml-2">Login</span>}
            </Link>
          )}
        </div>
      </div>

      {/* Main content beside sidebar */}
      <div className={`flex-1 ml-${expanded ? '64' : '20'} transition-all duration-300`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
