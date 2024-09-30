'use client';
import React, { useState } from "react";
import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";
import { SearchBar } from "./SearchBar";
import { FiPlus } from "react-icons/fi";

function Main() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle adding new todo
  const handleAdd = () => {
    if (newTodo.trim()) {
      const newItem = {
        id: Date.now(),
        title: newTodo,
        description: newDescription,
      };
      setTodos([...todos, newItem]);
      resetForm();
    }
  };

  // Handle editing an existing todo
  const handleEdit = (todo) => {
    setEditingTodo(todo.id);
    setNewTodo(todo.title);
    setNewDescription(todo.description);
    setIsPopupOpen(true);
  };

  // Save edited todo
  const handleSaveEdit = () => {
    setTodos(todos.map(todo => 
      todo.id === editingTodo 
        ? { ...todo, title: newTodo, description: newDescription } 
        : todo
    ));
    resetForm();
  };

  // Reset the form
  const resetForm = () => {
    setNewTodo("");
    setNewDescription("");
    setIsPopupOpen(false);
    setEditingTodo(null);
  };

  // Handle deleting a todo
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-2">
        <h1 className="font-bold text-2xl text-center mb-4 text-gray-800">Todo</h1>
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setIsPopupOpen={setIsPopupOpen} setEditingTodo={setEditingTodo} />

        <div className="border-t border-b border-gray-200 py-4">
          <TodoList todos={todos} searchTerm={searchTerm} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {/* Popup form for adding or editing a todo */}
      {isPopupOpen && (
        <TodoForm 
          isEditing={!!editingTodo} 
          newTodo={newTodo} 
          newDescription={newDescription} 
          setNewTodo={setNewTodo} 
          setNewDescription={setNewDescription} 
          onCancel={resetForm} 
          onSubmit={editingTodo ? handleSaveEdit : handleAdd} 
        />
      )}
    </div>
  );
}

export default Main;
