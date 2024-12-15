import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import AddTask from "./components/AddTask";
import TasksList from "./components/TasksList";

import "./App.css";
import "./utility.styles.css";

export interface TaskObject {
  id: number;
  title: string;
  body: string;
}

export const TasksListUpdateFunctionContext = createContext(
  {} as Dispatch<SetStateAction<TaskObject[]>>
);

export default function App() {
  const [tasks, setTasks] = useState<TaskObject[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const API_URL = import.meta.env.VITE_TASKS_API_URL;
      const { data } = await axios.get<TaskObject[]>(`${API_URL}/tasks`);
      setTasks(data);
    };

    void getTasks();
  }, []);

  return (
    <TasksListUpdateFunctionContext.Provider value={setTasks}>
      <div>
        <h1 id="app-title">Tasks App</h1>
        <AddTask />
        <hr />
        <TasksList tasks={tasks} />
      </div>
    </TasksListUpdateFunctionContext.Provider>
  );
}
