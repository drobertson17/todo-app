import axios from "axios";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

import { TaskObject, TasksListUpdateFunctionContext } from "../../../App";
import { TaskView } from "./Task";

import "./Task.styles.css";

interface TaskEditorProps {
  task: TaskObject;
  setTaskView: Dispatch<SetStateAction<TaskView>>;
}

export default function TaskEditor({ task, setTaskView }: TaskEditorProps) {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskBody, setTaskBody] = useState(task.body);
  const [isInvalidSave, setIsInvalidSave] = useState(false);

  const setTasks = useContext(TasksListUpdateFunctionContext);

  const taskTitleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  useEffect(() => {
    taskTitleInputRef.current.focus();
  }, []);

  const handleTaskSave = async (
    event: FormEvent<HTMLFormElement>,
    id: typeof task.id
  ) => {
    event.preventDefault();

    if (taskTitle.length > 0 || taskBody.length > 0) {
      const API_URL = import.meta.env.VITE_TASKS_API_URL;
      await axios.put(`${API_URL}/task/${id}`, {
        title: taskTitle,
        body: taskBody,
      });
      const { data } = await axios.get<TaskObject[]>(`${API_URL}/tasks`);
      setTasks(data);

      setTaskView(TaskView.VIEWING);
    } else {
      setIsInvalidSave(true);
      taskTitleInputRef.current.focus();
    }
  };

  return (
    <form
      id="task-container"
      onSubmit={(event) => void handleTaskSave(event, task.id)}
    >
      <input
        type="text"
        placeholder="Enter Task Title"
        ref={taskTitleInputRef}
        id="task-title-edit-input"
        className={isInvalidSave ? "input-error" : ""}
        value={taskTitle}
        onChange={(event) => {
          setIsInvalidSave(false);
          setTaskTitle(event.target.value);
        }}
      />
      <textarea
        placeholder="Enter Task"
        id="task-body-edit-input"
        className={isInvalidSave ? "input-error" : ""}
        cols={30}
        rows={5}
        value={taskBody}
        onChange={(event) => {
          setIsInvalidSave(false);
          setTaskBody(event.target.value);
        }}
      />
      <div className="task-buttons-container">
        <button className="save-btn" type="submit">
          Save
        </button>
        <button
          className="neutral-btn"
          type="button"
          onClick={() => setTaskView(TaskView.VIEWING)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
