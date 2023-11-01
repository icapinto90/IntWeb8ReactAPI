import { createContext, useContext, useEffect, useState } from "react";
import { Task } from "./Task";
import { tasksContext } from "../App";
import axios from "axios";
import _ from "lodash/array";
const backendPort = "3001";
const backendUrl = `http://localhost:${backendPort}`;

//creating context
export const checkedTasks = createContext();

export default function ListTask() {
  //vars
  const [tasks, setTasks] = useContext(tasksContext);
  const handleDelete = async (taskName) => {
    await axios.delete(`${backendUrl}/tasks/${taskName}`);
    fetchData();
  };
  const handleCompleted = async (taskName) => {
    await axios.post(`${backendUrl}/tasks/${taskName}/complete`);
    fetchData();
  };

  async function fetchData() {
    const req = await axios.get(`${backendUrl}/tasks`);
    setTasks(req.data.tasks);
  }

  useEffect(() => {
    (async () => {
      const req = await axios.get(`${backendUrl}/tasks`);
      setTasks(req.data.tasks);
    })();
  }, [setTasks]);

  return (
    <div>
      <h2>Liste des tâches : </h2>
      <ul className="tasks">
        {tasks.map((task) => {
          return (
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
          );
        })}
      </ul>
    </div>
  );
}
