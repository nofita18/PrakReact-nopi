import { NavLink } from "react-router-dom";
import {
  FaShoppingBasket,
  FaCubes,
  FaDatabase,
  FaRegStickyNote,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { LuClipboardList, LuUsers } from "react-icons/lu";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { profile } = useAuth();
  const role = profile?.role || "Guest";

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
    ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  // Filter menu berdasarkan role
  const isAdmin = role === "Admin";
  const isMember = role === "Member";

  return (
    <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      {/* Logo Section */}
      <div id="sidebar-logo" className="flex flex-col">
        <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
          Sedap <b id="logo-dot" className="text-hijau">.</b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* Menu Section */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          {/* Dashboard — Semua role bisa lihat */}
          <li>
            <NavLink id="menu-1" to="/" className={menuClass}>
              <MdSpaceDashboard className="mr-4 text-xl" />
              Dashboard
            </NavLink>
          </li>

          {/* Orders — Admin & Member */}
          {(isAdmin || isMember) && (
            <li>
              <NavLink to="/orders" id="menu-2" className={menuClass}>
                <div className="flex items-center w-full">
                  <LuClipboardList className="mr-4 text-xl" />
                  Orders
                </div>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  12
                </span>
              </NavLink>
            </li>
          )}

          {/* Customers — Admin Only */}
          {isAdmin && (
            <li>
              <NavLink to="/customers" id="menu-3" className={menuClass}>
                <LuUsers className="mr-4 text-xl" />
                Customers
              </NavLink>
            </li>
          )}

          {/* Products — Admin & Member */}
          {(isAdmin || isMember) && (
            <li>
              <NavLink to="/products" className={menuClass}>
                <FaShoppingBasket className="mr-4 text-xl" />
                Products
              </NavLink>
            </li>
          )}

          {/* Components — Admin Only */}
          {isAdmin && (
            <li>
              <NavLink to="/components" className={menuClass}>
                <FaCubes className="mr-4 text-xl" />
                Components
              </NavLink>
            </li>
          )}

          {/* Note — Semua role bisa lihat */}
          <li>
            <NavLink to="/note" className={menuClass}>
              <FaRegStickyNote className="mr-4 text-xl" />
              Note
            </NavLink>
          </li>

          {/* FiturXyz — Semua role */}
          <li>
            <NavLink to="/fiturXyz" className={menuClass}>
              <FaDatabase className="mr-4 text-xl" />
              Fitur Xyz
            </NavLink>
          </li>

          {/* Error pages — Admin Only */}
          {isAdmin && (
            <li>
              <NavLink to="/error400" className={menuClass}>
                Error 400
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink to="/error401" className={menuClass}>
                Error 401
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink to="/error403" className={menuClass}>
                Error 403
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Footer Section */}
      <div id="sidebar-footer" className="mt-auto">
        {isAdmin && (
          <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center justify-between">
            <div id="footer-text" className="text-white text-sm">
              <span>Please organize your menus through button below!</span>
              <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
                <span className="text-gray-600 flex items-center font-semibold">
                  <FaPlus className="mr-2" />
                  Add Menus
                </span>
              </div>
            </div>
            <img
              id="footer-avatar"
              className="w-20 rounded-full ml-2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s"
              alt="User Avatar"
            />
          </div>
        )}

        <div className="flex flex-col">
          <span id="footer-brand" className="font-bold text-gray-400">
            Sedap Restaurant Admin Dashboard
          </span>
          <p id="footer-copyright" className="font-light text-gray-400">
            &copy; 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}