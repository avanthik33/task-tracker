import { useEffect, useState } from "react";

type Tasks = {
  id: number;
  task: string;
  description: string;
  time: string;
  status: string;
};

const CompletedTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const fetchTasks = () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      const parsedTasks = JSON.parse(tasks);
      setTasks(parsedTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCheckboxChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      const updatedTasks = tasks.map((item) =>
        item.id === id ? { ...item, status: "completed" } : item
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      fetchTasks();
    } else {
      const updatedTasks = tasks.map((item) =>
        item.id === id ? { ...item, status: "pending" } : item
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      fetchTasks();
    }
  };
  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Completed Tasks
        </h1>
        <div className="space-y-6">
          {tasks
            .filter((item) => item.status === "completed")
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
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name={`status-${value.id}`}
                    id={`status-${value.id}`}
                    checked={value.status === "completed"}
                    onChange={(event) => handleCheckboxChange(value.id, event)}
                    className="w-6 h-6 bg-white border-2 border-gray-300 rounded-lg checked:bg-blue-600 checked:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ease-in-out"
                  />
                  <label
                    htmlFor={`status-${value.id}`}
                    className="text-sm text-gray-700"
                  >
                    Uncheck here
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default CompletedTasks;
