import { useEffect, useState } from "react";

type Tasks = {
  id: number;
  task: string;
  description: string;
  time: string;
  status: string;
};

const TimoutTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [currTime, setCurrTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updatedTasks = tasks.map((item) =>
      new Date(item.time) < currTime && item.status === "pending"
        ? { ...item, status: "timeout" }
        : item
    );

    if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  }, [currTime, tasks]);

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

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Timeout tasks
        </h1>
        <div className="space-y-6">
          {tasks
            .filter((item) => item.status === "timeout")
            .map((value) => (
              <div
                key={value.id}
                className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {value.task.toUpperCase()}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  {value.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Due: {new Date(value.time).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TimoutTasks;
