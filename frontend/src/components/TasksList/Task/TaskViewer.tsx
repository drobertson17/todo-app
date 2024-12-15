import { useState, Dispatch, SetStateAction } from "react";

import DeleteModal from "./DeleteModal";

import { TaskView } from "./Task";
import { TaskObject } from "../../../App";

import "./Task.styles.css";

interface TaskViewerProps {
  task: TaskObject;
  setTaskView: Dispatch<SetStateAction<TaskView>>;
}

export default function TaskViewer({ task, setTaskView }: TaskViewerProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id, title, body } = task;

  const handleDeleteTask = () => {
    setShowDeleteModal(true);
  };

  return (
    <div id="task-container">
      {showDeleteModal && (
        <DeleteModal showDeleteModal={setShowDeleteModal} taskId={id} />
      )}
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="task-buttons-container">
        <button
          className="neutral-btn"
          onClick={() => setTaskView(TaskView.EDITING)}
        >
          Edit
        </button>
        <button className="delete-btn" onClick={() => void handleDeleteTask()}>
          Delete
        </button>
      </div>
    </div>
  );
}
