import React from "react";

export const TodoForm = ({ isEditing, newTodo, newDescription, setNewTodo, setNewDescription, onCancel, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Todo" : "Add New Todo"}</h2>
        <input
          placeholder="Todo Title"
          className="border rounded-xl px-2 py-1 w-full mb-2"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <textarea
          placeholder="Todo Description"
          className="border rounded-xl px-2 py-1 w-full h-60 mb-4"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-1 rounded-xl">Cancel</button>
          <button onClick={onSubmit} className="bg-green-500 text-white px-4 py-1 rounded-xl">
            {isEditing ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
