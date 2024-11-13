import { useEffect, useState } from "react";
import { Tasks } from "../pages/Home";

interface UseTimeIntervalProps {
  task: Tasks[];
}

const useTimeInterval = ({ task }: UseTimeIntervalProps) => {
  console.log("<UseTimeInterval>");
  const [currTime, setCurrTime] = useState(new Date());
  const [tasks, setTasks] = useState(task);

  console.log("TAsks", tasks);

  useEffect(() => {
    setTasks(task);
  }, [task]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updatedTasks = tasks.map((item) =>
      new Date(item.time) < currTime && item.status === "pending"
        ? { ...item, status: "timeout" }
        : item
    );
    if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  }, [currTime, tasks]);

  return { tasks };
};

export default useTimeInterval;
