import React from "react";
import { FiPlus } from "react-icons/fi";

export const SearchBar = ({ searchTerm, setSearchTerm, setIsPopupOpen, setEditingTodo }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        placeholder="Search..."
        className="border rounded-xl px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FiPlus
        onClick={() => { setIsPopupOpen(true); setEditingTodo(null); }}
        className="text-green-500 hover:text-white hover:bg-gray-300 rounded-full cursor-pointer text-xl"
      />
    </div>
  );
};
