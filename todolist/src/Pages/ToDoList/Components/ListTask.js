import { createContext, useContext, useState } from "react";
import { Task } from "./Task";
import { tasksContext } from "../App";

//creating context
export const checkedTasks = createContext();

export default function ListTask() {
  //vars
  const [tasks, setTasks] = useContext(tasksContext);
  const [checkedTasksContext, setCheckedTasksContext] = useState([]);
  const handleDelete = (taskName) => {
    let tasksCopy = tasks;
    tasksCopy[tasksCopy.indexOf(taskName)] = null;
    setCheckedTasksContext((arr) => arr.filter((item) => item !== taskName));
    setTasks(tasksCopy.filter((e) => e));
  };

  return (
    <div>
      <h2>Liste des tâches : </h2>
      <ul className="tasks">
        {tasks.map((name) => {
          return (
            <checkedTasks.Provider
              value={[checkedTasksContext, setCheckedTasksContext]}
            >
              <Task
                checked={checkedTasksContext.includes(name)}
                classTask={
                  checkedTasksContext.includes(name) ? "task checked" : "task"
                }
                onDelete={(el) => {
                  handleDelete(el.target.id);
                }}
                task={{ name }}
              ></Task>
            </checkedTasks.Provider>
          );
        })}
      </ul>
    </div>
  );
}
