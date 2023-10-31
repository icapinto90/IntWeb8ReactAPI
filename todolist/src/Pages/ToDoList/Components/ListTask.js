import { createContext, useContext, useEffect, useState } from "react";
import { Task } from "./Task";
import { tasksContext } from "../App";
import axios from "axios";

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
  const handleCompleted = () => {};

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("http://localhost:3001/tasks");
      setTasks(req.data.tasks);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Liste des tâches : </h2>
      <ul className="tasks">
        {tasks.map((task) => {
          return (
            <checkedTasks.Provider
              value={[checkedTasksContext, setCheckedTasksContext]}
            >
              <Task
                classTask={task.completed ? "task checked" : "task"}
                onDelete={(el) => {
                  handleDelete(el.target.id);
                }}
                onComplete={(el) => {
                  handleCompleted(el.target.id);
                }}
                task={task}
              ></Task>
            </checkedTasks.Provider>
          );
        })}
      </ul>
    </div>
  );
}
