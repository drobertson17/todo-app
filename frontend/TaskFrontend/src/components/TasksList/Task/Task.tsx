import { useState } from "react";
import TaskViewer from "./TaskViewer";
import TaskEditor from "./TaskEditor";
import { TaskObject } from "../../../App";

export enum TaskView {
  VIEWING,
  EDITING,
}

export default function Task({ task }: { task: TaskObject }) {
  const [taskView, setTaskView] = useState<TaskView>(TaskView.VIEWING);

  switch (taskView) {
    case TaskView.VIEWING:
      return <TaskViewer task={task} setTaskView={setTaskView} />;
    case TaskView.EDITING:
      return <TaskEditor task={task} setTaskView={setTaskView} />;
    default:
      return <></>;
  }
}
