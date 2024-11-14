import { useEffect, useState } from "react";
import { UseTimeIntervalProps } from "../typesAndInterfaces";
import { Tasks } from "../typesAndInterfaces";

const useTimeInterval = ({ task }: UseTimeIntervalProps) => {
  console.log("<UseTimeInterval>");
  const [currTime, setCurrTime] = useState(new Date());
  const [tasks, setTasks] = useState(task);

  useEffect(() => {
    setTasks(task);
  }, [task]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks: Tasks[] = JSON.parse(storedTasks);
      const updatedTasks = tasks.map((item) =>
        new Date(item.time) < currTime && item.status === "pending"
          ? { ...item, status: "timeout" }
          : item
      );
      if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
      }
    }
  }, [currTime]);

  return { tasks };
};

export default useTimeInterval;
