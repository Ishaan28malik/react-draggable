import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = inputValue;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, inputValue]);
      }
      setInputValue("");
    }
  };

  const handleEdit = (index) => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData("index"));
    const updatedTodos = [...todos];
    const [draggedItem] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(dropIndex, 0, draggedItem);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      Todo List
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>{editIndex !== null ? "Edit" : "Add"}</button>
      <ul>
        {todos.map((item, index) => (
          <li
            draggable
            key={index}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {item}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
