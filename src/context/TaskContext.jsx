import { createContext, useState } from "react";

export const TaskContext = createContext();

function TaskProvider({ children }) {

  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;