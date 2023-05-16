import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addTodo = (): void => {
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

  const handleEdit = (index: number): void => {
    setInputValue(todos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number): void => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ): void => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    // e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.MouseEvent<HTMLDivElement>,
    dropIndex: number
  ): void => {
    // const dragIndex = parseInt(e.dataTransfer.getData("index"));
    const updatedTodos = [...todos];
    // const [draggedItem] = updatedTodos.splice(dragIndex, 1);
    // updatedTodos.splice(dropIndex, 0, draggedItem);
    setTodos(updatedTodos);
  };

  const handleDragDone = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ): void => {
    if (draggedIndex !== null) {
      const updatedTodos = [...todos];
      const [draggedItem] = updatedTodos.splice(draggedIndex, 1);
      updatedTodos.splice(index, 0, draggedItem);
      setTodos(updatedTodos);
      setDraggedIndex(index);
    }
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        {todos.map((item, index) => (
          <div
            key={index}
            onMouseDown={(e) => handleDragStart(e, index)}
            onMouseEnter={(e) => handleDragDone(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            style={{ cursor: "move" }}
          >
            {item}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
