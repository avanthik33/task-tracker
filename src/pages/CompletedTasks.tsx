import { Fragment, useEffect, useState } from "react";
import { Tasks } from "../typesAndInterfaces";
import { signupData } from "../typesAndInterfaces";
import useTimeInterval from "../hooks/useTimeInterval";
import { handleCheckboxChange } from "../utils";

const CompletedTasks: React.FC = () => {
  console.log("<CompletedTasks>");
  const storedUser = localStorage.getItem("loggedUser");
  const user: signupData | null = storedUser ? JSON.parse(storedUser) : null;

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const { tasks: updatedTasks } = useTimeInterval({ task: tasks });

  useEffect(() => {
    if (user) {
      const fetchTasks = (userId: number) => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          const tasks: Tasks[] = JSON.parse(storedTasks);
          const filteredTasks = tasks.filter(
            (item) => item.userId === userId && item.status === "completed"
          );
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ) => {
    handleCheckboxChange(id, event, setTasks);
  };

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
    <Fragment>
      <div className="max-w-2xl mx-auto mt-10 px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Completed Tasks
        </h1>
        <div className="space-y-6">
          {tasks.map((value) => (
            <div
              key={value.id}
              className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {value.task.toUpperCase()}
              </h2>
              <p className="text-sm text-gray-600 mb-3">{value.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Due: {new Date(value.time).toLocaleString()}
              </p>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name={`status-${value.id}`}
                  id={`status-${value.id}`}
                  checked={value.status === "completed"}
                  onChange={(event) => handleChange(event, value.id)}
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
    </Fragment>
  );
};

export default CompletedTasks;
