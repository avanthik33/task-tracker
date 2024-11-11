import { useState } from "react";

type Tasks = {
  id: number;
  task: string;
  description: string;
  time: string;
  status: string;
};

const TimoutTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  
  return <></>;
};

export default TimoutTasks;
