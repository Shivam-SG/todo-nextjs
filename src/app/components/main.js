'use client';
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TodoList from "./TodoList";
import TodoPopup from "./TodoPopup";

function Main() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    if (newTodo.trim()) {
      const newItem = { id: Date.now(), title: newTodo, description: newDescription };
      setTodos([...todos, newItem]);
      resetForm();
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo.id);
    setNewTodo(todo.title);
    setNewDescription(todo.description);
    setIsPopupOpen(true);
  };

  const handleSaveEdit = () => {
    setTodos(todos.map(todo => todo.id === editingTodo ? { ...todo, title: newTodo, description: newDescription } : todo));
    resetForm();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index) => {
    const draggedOverItem = todos[index];
    if (draggedItem === index) return;
    const items = todos.filter((item, i) => i !== draggedItem);
    items.splice(index, 0, todos[draggedItem]);
    setDraggedItem(index);
    setTodos(items);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const resetForm = () => {
    setNewTodo("");
    setNewDescription("");
    setIsPopupOpen(false);
    setEditingTodo(null);
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-2">
        <h1 className="font-bold text-2xl text-center mb-4 text-gray-800">Todo</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            placeholder="Search..."
            className="border rounded-xl px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 w-3/4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiPlus
            onClick={() => { resetForm(); setIsPopupOpen(true); }}
            className="text-green-500 hover:text-white hover:bg-gray-300 rounded-full cursor-pointer text-xl"
          />
        </div>
        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
          draggedItem={draggedItem}
        />
      </div>
      <TodoPopup
        isOpen={isPopupOpen}
        newTodo={newTodo}
        newDescription={newDescription}
        onTodoChange={(e) => setNewTodo(e.target.value)}
        onDescriptionChange={(e) => setNewDescription(e.target.value)}
        onClose={() => setIsPopupOpen(false)}
        onSave={editingTodo ? handleSaveEdit : handleAdd}
        editingTodo={editingTodo}
      />
    </div>
  );
}

export default Main;
