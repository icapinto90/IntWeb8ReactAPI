import { createContext, useState } from "react";
import { createPortal } from "react-dom";
import ListTask from "./Components/ListTask";
import ModalContent from "../../Components/ModalContent";
import "./App.css";
import axios from "axios";
const backendPort = "3001";
const backendUrl = `http://localhost:${backendPort}`;

//creating context
export const tasksContext = createContext();

export default function App() {
  //vars
  const [tasks, setTasks] = useState([]);
  const [taskAdd, setTaskAdd] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalType, setModalType] = useState("");
  const [modalTimeOut, setModalTimeOut] = useState("");

  async function fetchData() {
    const req = await axios.get(`${backendUrl}/tasks`);
    setTasks(req.data.tasks);
  }

  //add tasks
  async function addTask() {
    if (!taskAdd) {
      setModalText("Veuillez remplir le champ");
      setModalType("error");
    } else {
      if (tasks.some((e) => e.name === taskAdd)) {
        setModalText("Tâche déjà existante");
        setModalType("error");
        return;
      }
      setModalType("success");
      setModalText("Action réussie");
      await axios.post(`${backendUrl}/tasks`, {
        name: taskAdd,
        completed: false,
      });
      fetchData();
    }
    setShowModal(true);
    closeModal();
  }

  //close modal after 5 secs
  function closeModal() {
    clearTimeout(modalTimeOut);
    setModalTimeOut(
      setTimeout(() => {
        setShowModal(false);
      }, 5000)
    );
  }

  return (
    <div className="App">
      <h1>ToDoList</h1>
      <input
        value={taskAdd}
        onChange={(e) => setTaskAdd(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      ></input>
      <button onClick={addTask}>Ajouter</button>
      <tasksContext.Provider value={[tasks, setTasks]}>
        <ListTask />
      </tasksContext.Provider>

      {showModal &&
        createPortal(
          <ModalContent
            text={modalText}
            type={modalType}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
}
