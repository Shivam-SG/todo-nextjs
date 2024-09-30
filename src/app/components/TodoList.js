import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, filteredTodos, onEdit, onDelete, handleDragStart, handleDragOver, handleDragEnd, draggedItem }) => {
  return (
    <div className="border-t border-b border-gray-200 py-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos available. Please add some!</p>
      ) : filteredTodos.length === 0 ? (
        <p className="text-center text-gray-500">No todos available.</p>
      ) : (
        filteredTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
            isDragging={draggedItem === index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
