import React from "react";
import { RxDragHandleDots1 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const TodoItem = ({ todo, onEdit, onDelete, index, isDragging, onDragStart, onDragOver, onDragEnd }) => {
  return (
    <div
      key={todo.id}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`todo-item flex justify-between items-center mb-4 cursor-pointer bg-gray-50 p-2 rounded-md transition-transform ease-in-out duration-200 ${isDragging ? "is-dragging" : ""}`}
    >
      <div className="flex items-center space-x-4">
        <RxDragHandleDots1 className="text-gray-500 text-xl cursor-move" />
        <div>
          <h1 className="font-semibold text-gray-800">{todo.title}</h1>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <FaRegEdit onClick={() => onEdit(todo)} className="text-blue-500 hover:text-blue-700 cursor-pointer text-lg" />
        <MdDeleteOutline onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
      </div>
    </div>
  );
};

export default TodoItem;
