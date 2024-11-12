import { useEffect, useState } from "react";

type Tasks = {
  id: number;
  userId: number;
  task: string;
  description: string;
  time: string;
  status: string;
};
interface signupData {
  userId: number;
  username: string;
  email: string;
  phone: number;
  confirmPass: string;
  password: string;
}

const PendingTasks: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser") || "");
  const [loggedUser, setLoggedUser] = useState<signupData>({
    userId: user.userId,
    username: "",
    email: "",
    phone: 0,
    confirmPass: "",
    password: "",
  });

  const [tasks, setTasks] = useState<Tasks[]>([]);

  const [currTime, setCurrTime] = useState(new Date());

  useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setLoggedUser(parsedUser);
    }
  }, []);

  const fetchTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks: Tasks[] = JSON.parse(storedTasks);
      const filterdTasks = tasks.filter(
        (item) => item.userId === loggedUser.userId
      );
      setTasks(filterdTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
          Pending Tasks
        </h1>
        <div className="space-y-6">
          {tasks
            .filter((item) => item.status === "pending")
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
                    Mark as Completed
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PendingTasks;
