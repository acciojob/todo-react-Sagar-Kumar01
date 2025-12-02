import React, { useState } from "react";
import "../styles/styles.css"

function Todo() {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  function writing(e) {
    setTask(e.target.value);
  }

  function adding() {
    const trimmed = task.trim();
    if (!trimmed) return;

    if (editId === null) {
      const newItem = { id: Date.now() + Math.random(), text: trimmed };
      setTodo((prev) => [...prev, newItem]);
    } else {
      setTodo((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, text: trimmed } : item))
      );
      setEditId(null);
    }

    setTask("");
  }

  function deleting(id) {
    setTodo((prev) => prev.filter((val) => val.id !== id));
  }

  function editing(id) {
    const item = todo.find((val) => val.id === id);
    if (!item) return;
    setTask(item.text);
    setEditId(id);
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        placeholder="todo..."
        onChange={writing}
        value={task}
      />
      <button onClick={adding}>{editId === null ? "Add Todo" : "Save"}</button>

      {todo.map((val) => (
        <ul>
        <li key={val.id}>
          <p>{val.text}</p>
          <button onClick={() => deleting(val.id)}>Remove</button>
          <button onClick={() => editing(val.id)}>Edit</button>
        </li>
        </ul>
      ))}
    </div>
  );
}

export default Todo;
