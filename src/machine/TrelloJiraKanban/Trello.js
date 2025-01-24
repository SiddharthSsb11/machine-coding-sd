import React, { useState } from "react";

const initialCategories = ["To Do", "In Progress", "In Review", "Done"];

const App = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To Do",
    color: "#FFFFFF",
  });
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({
        title: "",
        description: "",
        category: "To Do",
        color: "#FFFFFF",
      });
    } else {
      alert("Please fill in the task title and description.");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = () => {
    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
    );
    setEditingTask(null);
  };

  const addCategory = (newCategory) => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    } else {
      alert("Invalid or duplicate category.");
    }
  };

  const changeCategory = (taskId, newCategory) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, category: newCategory } : task
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Trello/Kanban Board</h1>

      {/* Add New Task Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        ></textarea>
        <select
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="color"
          value={newTask.color}
          onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Add New Category Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add Category</h2>
        <input
          type="text"
          placeholder="New Category"
          onKeyDown={(e) => {
            if (e.key === "Enter") addCategory(e.target.value);
          }}
        />
        <small>Press Enter to add a new category</small>
      </div>

      {/* Board */}
      <div style={{ display: "flex", gap: "20px" }}>
        {categories.map((category) => (
          <div
            key={category}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <h3>{category}</h3>
            {tasks
              .filter((task) => task.category === category)
              .map((task) => (
                <div
                  key={task.id}
                  style={{
                    backgroundColor: task.color,
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <button onClick={() => setEditingTask(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  <select
                    value={task.category}
                    onChange={(e) => changeCategory(task.id, e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "30%",
            background: "#fff",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <textarea
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
          ></textarea>
          <select
            value={editingTask.category}
            onChange={(e) =>
              setEditingTask({ ...editingTask, category: e.target.value })
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="color"
            value={editingTask.color}
            onChange={(e) =>
              setEditingTask({ ...editingTask, color: e.target.value })
            }
          />
          <button onClick={updateTask}>Update Task</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
