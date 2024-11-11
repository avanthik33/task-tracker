import { useEffect, useState } from "react";

type Tasks = {
  id: number;
  task: string;
  description: string;
  time: string;
  status: string;
};

const nowDate = Date.now();

const TimoutTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const fetchTasks = () => {
    const unparsedTasks = localStorage.getItem("tasks");
    if (unparsedTasks) {
      const tasks = JSON.parse(unparsedTasks);
      setTasks(tasks);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const checkTimeout = () => {
    tasks.map((item)=>item.time > nowDate )
  };

  return <></>;
};

export default TimoutTasks;
