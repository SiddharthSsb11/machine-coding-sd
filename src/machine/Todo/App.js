import React, { useEffect, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingTodoId, setEditingTodoId] = useState(null); // For tracking the todo being edited
  const [editingTodoTitle, setEditingTodoTitle] = useState(""); // For holding the new title
  const todosPerPage = 10;

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      const todosWithTimestamps = data.map((todo) => ({
        ...todo,
        timeAdded: new Date().getTime(),
      }));
      setTodos(todosWithTimestamps);
      setFilteredTodos(todosWithTimestamps);
    };
    fetchTodos();
  }, []);

  // Filter todos based on completion status
  useEffect(() => {
    let filtered = todos;
    if (filterStatus === "complete") {
      filtered = todos.filter((todo) => todo.completed);
    } else if (filterStatus === "incomplete") {
      filtered = todos.filter((todo) => !todo.completed);
    }
    setFilteredTodos(filtered);
  }, [todos, filterStatus]);

  // Add a new todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newTodoItem = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
      timeAdded: new Date().getTime(),
    };
    setTodos([newTodoItem, ...todos]);
    setNewTodo("");
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Edit an existing todo
  const startEditingTodo = (id, title) => {
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editingTodoTitle } : todo
    );
    setTodos(updatedTodos);
    cancelEditingTodo();
  };

  const cancelEditingTodo = () => {
    setEditingTodoId(null);
    setEditingTodoTitle("");
  };

  // Sort todos by time added
  const sortTodos = () => {
    const sortedTodos = [...filteredTodos].sort((a, b) =>
      sortOrder === "asc"
        ? a.timeAdded - b.timeAdded
        : b.timeAdded - a.timeAdded
    );
    setFilteredTodos(sortedTodos);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>

      {/* Add New To-Do */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Filter and Sort */}
      <div style={{ marginTop: "20px" }}>
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <button onClick={sortTodos}>
          Sort by Time ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* Table */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{indexOfFirstTodo + index + 1}</td>
              <td>
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editingTodoTitle}
                    onChange={(e) => setEditingTodoTitle(e.target.value)}
                  />
                ) : (
                  todo.title
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
              </td>
              <td>
                {editingTodoId === todo.id ? (
                  <>
                    <button onClick={() => saveEditedTodo(todo.id)}>
                      Save
                    </button>
                    <button onClick={cancelEditingTodo}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditingTodo(todo.id, todo.title)}
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
