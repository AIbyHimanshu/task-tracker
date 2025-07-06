import React, { useState } from "react";
import "../styles/App.css";

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isEditing) {
    return (
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "1rem",
          marginBottom: "1rem",
          border: "2px solid #3b82f6",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="form-input"
            placeholder="Task title"
            style={{ marginBottom: "0.5rem" }}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="form-input"
            placeholder="Task description"
            rows="2"
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={handleEdit}
            style={{
              background: "#10b981",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✓ Save
          </button>
          <button
            onClick={handleCancel}
            style={{
              background: "#6b7280",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <button
          onClick={() => onToggleComplete(task.id)}
          style={{
            background: "none",
            border: `2px solid ${task.completed ? "#10b981" : "#d1d5db"}`,
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2px",
            fontSize: "12px",
            color: task.completed ? "#10b981" : "transparent",
          }}
        >
          ✓
        </button>

        <div style={{ flex: 1 }}>
          {/* ✅ Priority badge */}
          {task.priority && (
            <span
              style={{
                display: "inline-block",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                color: "white",
                backgroundColor:
                  task.priority === "High"
                    ? "#dc2626"
                    : task.priority === "Medium"
                    ? "#f59e0b"
                    : "#10b981",
                marginBottom: "0.5rem"
              }}
            >
              {task.priority}
            </span>
          )}

          <h3
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "1.1rem",
              color: task.completed ? "#6b7280" : "#1f2937",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              style={{
                margin: "0 0 0.5rem 0",
                color: task.completed ? "#9ca3af" : "#6b7280",
                fontSize: "0.9rem",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.description}
            </p>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.75rem",
              color: "#9ca3af",
            }}
          >
            <span>🕐</span>
            <span>{formatDate(task.createdAt)}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              borderRadius: "4px",
              color: "#3b82f6",
            }}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              borderRadius: "4px",
              color: "#ef4444",
            }}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
