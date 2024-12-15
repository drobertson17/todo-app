import { useState, useEffect, useRef, useContext, FormEvent } from "react";
import axios from "axios";

import "./AddTask.styles.css";
import { TaskObject, TasksListUpdateFunctionContext } from "../../App";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [taskBody, setTaskBody] = useState("");
  const [taskStatus, setTaskStatus] = useState("Backlog");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [hasInputError, setHasInputError] = useState(false);

  const setTasks = useContext(TasksListUpdateFunctionContext);

  const titleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length > 0 || taskBody.length > 0) {
      setIsFormSubmitting(true);
      const API_URL = import.meta.env.VITE_TASKS_API_URL;
      const { data } = await axios.post<TaskObject>(`${API_URL}/task`, {
        title,
        body: taskBody,
        status: taskStatus,
      });
      setTasks((prev) => [...prev, data]);
    } else {
      setHasInputError(true);
    }

    setTitle("");
    setTaskBody("");
    setTaskStatus("Backlog");
    setIsFormSubmitting(false);
    titleInputRef.current.focus();
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)} id="add-task-form">
      <input
        type="text"
        placeholder="Enter Title"
        ref={titleInputRef}
        id="title-input"
        className={hasInputError ? "input-error" : ""}
        value={title}
        onChange={(event) => {
          setHasInputError(false);
          setTitle(event.target.value);
        }}
      />
      <textarea
        placeholder="Enter Task"
        id="task-body-textarea"
        className={hasInputError ? "input-error" : ""}
        cols={30}
        rows={2}
        value={taskBody}
        onChange={(event) => {
          setHasInputError(false);
          setTaskBody(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter Status"
        id="status-input"
        className={hasInputError ? "input-error" : ""}
        value={taskStatus}
        onChange={(event) => {
          setHasInputError(false);
          setTaskStatus(event.target.value);
        }}
      />
      <button id="add-task-btn" type="submit" disabled={isFormSubmitting}>
        {isFormSubmitting ? "..." : "Add Task"}
      </button>
    </form>
  );
}
