import { useEffect, useState } from "react";
import Error from "../components/Error";

type Task = {
  id: number;
  task: string;
  description: string;
  time: string;
  status: string;
};

const Home: React.FC = () => {
  const [formData, setFormData] = useState<Task>({
    id: Date.now(),
    task: "",
    description: "",
    time: "",
    status: "pending",
  });
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => {
        clearInterval(errorTimeout);
      };
    }
  }, [error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const fetchTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks);
      setTasks(tasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.task || !formData.description || !formData.time) {
      setError("fill all the input fields!");
      return false;
    }
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(formData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setFormData({
      id: Date.now(),
      task: "",
      description: "",
      time: "",
      status: "pending",
    });
    setTasks(tasks);
  };

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
      {error && (
        <div className="flex m-5 justify-center bg-red-100 text-red-700 p-4 rounded-lg shadow-md mb-4">
          <Error message={error} />
        </div>
      )}
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-4xl font-semibold text-gray-800">Add Task</h1>
      </div>
      <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSumbitForm} className="space-y-4">
          <div className="">
            <label
              htmlFor="task"
              className="block mb-1 ml-1 text-sm font-medium text-gray-700"
            >
              Task
            </label>
            <input
              type="text"
              id="task"
              onChange={handleInputChange}
              name="task"
              value={formData.task}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task"
            />
          </div>
          <div className="">
            <label
              htmlFor="task"
              className="block mb-1 ml-1  text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="task"
              onChange={handleInputChange}
              name="description"
              value={formData.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task description"
            />
          </div>

          <div className="">
            <label
              htmlFor="time"
              className="block mb-1 ml-1  text-sm font-medium text-gray-700"
            >
              Set Time
            </label>
            <input
              name="time"
              onChange={handleInputChange}
              value={formData.time}
              type="datetime-local"
              id="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={!!error}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-200 ease-in-out"
          >
            ADD TASK
          </button>
        </form>
      </div>
      {tasks.length < 1 ? (
        <h1 className="text-center text-3xl font-semibold text-gray-700 mt-10">
          No recent tasks, add a new one
        </h1>
      ) : (
        <div className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Recent Tasks
          </h2>
          <div className="space-y-4">
            <ul className="space-y-3">
              {tasks
                .slice(-4)
                .reverse()
                .map((value) => (
                  <li
                    key={value.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg text-gray-700 font-medium">
                      {value.task}
                    </span>

                    <span className="ml-4 text-sm text-gray-500">
                      {value.status}
                    </span>

                    {value.status === "timeout" ? (
                      <span className="ml-4"></span>
                    ) : (
                      <span className="ml-4">
                        <input
                          type="checkbox"
                          name={`status-${value.id}`}
                          id={`status-${value.id}`}
                          checked={value.status === "completed"}
                          onChange={(event) =>
                            handleCheckboxChange(value.id, event)
                          }
                          className="w-6 h-6 bg-white border-2 border-gray-300 rounded-lg checked:bg-blue-600 checked:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 ease-in-out"
                        />
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
