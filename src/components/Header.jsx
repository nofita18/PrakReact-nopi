import { FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/SearchModal";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <div className="flex justify-between items-center p-4 relative">
      {/* Search */}
      <div id="search-bar" onClick={() => setOpen(true)} className="relative w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 border rounded-md bg-white"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <div className="relative p-3 bg-blue-100 rounded-xl cursor-pointer hover:bg-blue-200 transition-colors">
          <FaBell />
          <span className="absolute top-0 right-0 text-xs bg-blue-200 px-1 rounded-full">
            50
          </span>
        </div>

        <div className="p-3 bg-blue-100 rounded-xl cursor-pointer hover:bg-blue-200 transition-colors">
          <FcAreaChart />
        </div>

        {/* Profile */}
        <div className="relative flex items-center space-x-3 border-l pl-4">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>
              hai, <b>{displayName}</b>
            </span>
            {profile?.role && (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                {profile.role}
              </span>
            )}
            <img
              src="https://filebroker-cdn.lazada.co.id/kf/Sbae81653a1a74c37813886757468d094L.jpg"
              className="w-10 h-10 rounded-full"
              alt="Profile"
            />
          </div>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border py-1 w-48 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <SearchModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}