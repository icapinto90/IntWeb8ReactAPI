import { createContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ListTask from "./Components/ListTask";
import ModalContent from "../../Components/ModalContent";
import "./App.css";

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

  //add tasks
  function addTask() {
    if (!taskAdd) {
      setModalText("Veuillez remplir le champ");
      setModalType("error");
    } else {
      if (tasks.includes(taskAdd)) {
        setModalText("Tâche déjà existante");
        setModalType("error");
        return;
      }
      setModalType("success");
      setModalText("Action réussie");
      setTasks((arr) => [...arr, taskAdd]);
      setTaskAdd("");
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
