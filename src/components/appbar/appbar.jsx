import React, { useState } from "react";

const AppBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
           ☰
        </button>

        <div className="text-2xl font-bold">Logo</div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md text-black caret-pink-500"
          />
        </div>
      </nav>
      <div 
        className="w-full" 
        onClick={() => ""}>
      <div
        className={`fixed top-0 left-0 h-full w-2/3 sm:w-2/3 md:w-1/2 lg:w-1/4 bg-gray-800 text-white transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        
      >
        <div className="p-4">
        <button
            onClick={toggleSidebar}
            className=" mt-4 bg-red-500 text-white rounded-md text-center py-1 float-right"
          >
            X
          </button>
          <div className="text-2xl font-bold">Menu</div>

        </div>
      </div>
      </div>
      
    </div>
  );
};

export default AppBar;
