import React, { useRef, useState } from "react";
import { RxDragHandleDots1 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const TodoItem = ({ todo, onEdit, onDelete, index, isDragging, onDragStart, onDragOver, onDragEnd }) => {
  const [touchStartY, setTouchStartY] = useState(0);
  const todoItemRef = useRef(null);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
    onDragStart(index); // Trigger drag start logic
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touchCurrentY = e.touches[0].clientY;

    // Calculate distance moved and adjust dragging behavior accordingly
    const moveDistance = touchCurrentY - touchStartY;

    // Move the todo item visually (for smoother drag effect)
    if (todoItemRef.current) {
      todoItemRef.current.style.transform = `translateY(${moveDistance}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (todoItemRef.current) {
      // Reset visual movement
      todoItemRef.current.style.transform = "translateY(0px)";
    }
    onDragEnd(); // Trigger drag end logic
  };

  return (
    <div
      ref={todoItemRef}
      key={todo.id}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onTouchStart={handleTouchStart}  // For touch devices
      onTouchMove={handleTouchMove}    // For touch devices
      onTouchEnd={handleTouchEnd}      // For touch devices
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