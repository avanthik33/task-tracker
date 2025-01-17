import { useEffect, useState } from "react";
import Error from "../components/Error";
import { signupData } from "../typesAndInterfaces";
import {useTimeInterval} from "../hooks/useTimeInterval";
import { Tasks } from "../typesAndInterfaces";
import { handleCheckboxChange } from "../utils";
import AOS from "aos";
import "aos/dist/aos.css";

const Home: React.FC = () => {
  console.log("<HOME>");
  const storedUser = localStorage.getItem("loggedUser");
  const user: signupData | null = storedUser ? JSON.parse(storedUser) : null;
  const [formData, setFormData] = useState<Tasks>({
    id: Math.random() - 0.5,
    userId: user ? user.userId : 0,
    task: "",
    description: "",
    time: "",
    status: "pending",
  });
  const [error, setError] = useState<string>("");
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const { tasks: updatedTasks } = useTimeInterval({ task: tasks });

  useEffect(() => {
    if (!user) {
      setError("no logged user is found!");
      return;
    } else {
      const fetchTasks = (userId: number) => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          const tasks: Tasks[] = JSON.parse(storedTasks);
          const filteredTasks = tasks.filter((item) => item.userId === userId);
          setTasks((prevTasks) => {
            if (JSON.stringify(prevTasks) !== JSON.stringify(filteredTasks)) {
              return filteredTasks;
            }
            return prevTasks;
          });
        }
      };
      fetchTasks(user.userId);
    }
  }, [user, updatedTasks]);

  const handleSumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.task || !formData.description || !formData.time) {
      setError("fill all the input fields!");
      return false;
    }

    const storedTasks = localStorage.getItem("tasks");
    const tasksFromStorage: Tasks[] = storedTasks
      ? JSON.parse(storedTasks)
      : [];
    tasksFromStorage.push(formData);
    localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
    setTasks(tasksFromStorage);
    setFormData({
      id: Math.random() - 0.5,
      userId: user ? user.userId : 0,
      task: "",
      description: "",
      time: "",
      status: "pending",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ) => {
    handleCheckboxChange(id, event, setTasks);
  };

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => {
        clearTimeout(errorTimeout);
      };
    }
  }, [error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  if (!user) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen">
          <h2 className="text-2xl font-semibold text-gray-700">
            No loggedUser found!
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      {error && (
        <div className="flex m-5 justify-center bg-red-100 text-red-700 p-4 rounded-lg shadow-md mb-4">
          <Error message={error} />
        </div>
      )}

      <div className="flex justify-center items-center mt-10">
        <h1 className="text-4xl font-semibold text-gray-800">
          Hei{" " + user?.username.toUpperCase() + "  "}Add a Task
        </h1>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        data-aos-duration="500"
        className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
      >
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
              id="description"
              onChange={handleInputChange}
              name="description"
              value={formData.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aso-duration="500"
          className="max-w-2xl mx-auto mt-8"
        >
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

                    <span
                      className="ml-4 text-sm text-gray-500"
                      data-testid={`task-checkbox-status-${value.id}`}
                    >
                      {value.status}
                    </span>

                    {value.status !== "timeout" && (
                      <span className="ml-4">
                        <input
                          type="checkbox"
                          name={`status-${value.id}`}
                          id={`status-${value.id}`}
                          data-testid={`task-checkbox-${value.id}`}
                          checked={value.status === "completed"}
                          onChange={(event) => handleChange(event, value.id)}
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
