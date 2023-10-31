import { useContext } from "react";
import { checkedTasks } from "./ListTask";

export function Task({ task, onDelete, classTask, checked, onComplete }) {
  // eslint-disable-next-line no-unused-vars
  const [checkedTasksContext, setCheckedTasksContext] =
    useContext(checkedTasks);

  return (
    <li key={task.name} className={classTask}>
      <span>{task.name}</span>
      <label>
        Complété ?
        <input
          type="checkbox"
          id={task.name}
          checked={task.completed}
          onChange={onComplete}
        />
      </label>
      <button id={task.name} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}
