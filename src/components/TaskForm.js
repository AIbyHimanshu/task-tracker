import React, { useState } from "react";
import "../styles/App.css";

const TaskForm = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new task
    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setErrors({});
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <h3 style={{ marginBottom: "1rem", color: "#1f2937" }}>Add New Task</h3>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div className="form-group">
          <label className="form-label">
            Title <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: "" }));
              }
            }}
            className="form-input"
            placeholder="Enter task title"
            autoFocus
          />
          {errors.title && (
            <p
              style={{
                color: "#ef4444",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.title}
            </p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            placeholder="Enter task description (optional)"
            rows="3"
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-input"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            Add Task
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
