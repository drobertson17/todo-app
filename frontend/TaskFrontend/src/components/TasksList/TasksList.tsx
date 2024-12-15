import { TaskObject } from "../../App";
import Task from "./Task";

import "./TasksList.styles.css";

export default function TasksList({ tasks }: { tasks: TaskObject[] }) {
  return (
    <div id="tasks-list-container">
      <h2 id="tasks-list-header">TASKS</h2>
      <ul id="tasks-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}
