import { useContext } from "react";
import { checkedTasks } from "./ListTask";

export function Task({ task, onDelete, classTask, checked }) {
  // eslint-disable-next-line no-unused-vars
  const [checkedTasksContext, setCheckedTasksContext] =
    useContext(checkedTasks);
  function handleCheckboxChange(e) {
    checked = e.target.checked;
    if (e.target.checked) {
      setCheckedTasksContext((arr) => [...arr, task.name]);
    } else {
      setCheckedTasksContext((arr) => arr.filter((e) => e !== task.name));
    }
  }

  return (
    <li key={task.name} className={classTask}>
      <span>{task.name}</span>
      <label>
        Complété ?
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => handleCheckboxChange(e)}
        />
      </label>
      <button id={task.name} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}
