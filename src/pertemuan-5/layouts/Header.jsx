import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useState } from "react";
import SearchModal from "../components/SearchModal";

export default function Header() {
    const [open,setOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-4">

      {/* Search */}
      <div id="search-bar" onClick={()=>setOpen(true)}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pr-10 border rounded-md"
        />
        <FaSearch className="absolute right-3 top-3 text-gray-400" />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">

        <div className="relative p-3 bg-blue-100 rounded-xl">
          <FaBell />
          <span className="absolute top-0 right-0 text-xs bg-blue-200 px-1 rounded-full">
            50
          </span>
        </div>

        <div className="p-3 bg-blue-100 rounded-xl">
          <FcAreaChart />
        </div>

        <div className="p-3 bg-red-100 rounded-xl">
          <SlSettings />
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-3 border-l pl-4">
          <span><b>Nofita Nurchasanah</b></span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ExGEHlPHckD3YbxH6e4kr25Ho2X4NifiQA&s"
            className="w-10 h-10 rounded-full"
          />
        </div>

      </div>
      <SearchModal isOpen={open} onClose={()=>setOpen(false)} />
    </div>
  );
}