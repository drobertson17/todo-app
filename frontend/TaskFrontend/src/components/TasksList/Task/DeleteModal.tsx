import { useContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

import { TaskObject, TasksListUpdateFunctionContext } from "../../../App";

import "./DeleteModal.styles.css";

interface DeleteModalProps {
  taskId: number;
  showDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({
  taskId,
  showDeleteModal,
}: DeleteModalProps) {
  const setTasks = useContext(TasksListUpdateFunctionContext);

  const handleYesClick = async () => {
    const API_URL = import.meta.env.VITE_TASKS_API_URL;
    await axios.delete(`${API_URL}/task/${taskId}`);

    const { data } = await axios.get<TaskObject[]>(`${API_URL}/tasks`);
    setTasks(data);
    showDeleteModal(false);
  };

  const handleNoClick = () => {
    showDeleteModal(false);
  };

  return (
    <div id="delete-modal-container">
      <div id="delete-modal">
        <p id="prompt-msg">Delete this Task?</p>
        <div id="btn-container">
          <button id="yes-btn" onClick={() => void handleYesClick()}>
            Yes
          </button>
          <button id="no-btn" onClick={handleNoClick}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
