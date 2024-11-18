import { useEffect, useState } from "react";
import { Tasks } from "../typesAndInterfaces";
import { signupData } from "../typesAndInterfaces";
import useTimeInterval from "../hooks/useTimeInterval";

const TimoutTasks: React.FC = () => {
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
            (item) => item.userId === userId && item.status === "timeout"
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

  if (tasks.length === 0) {
    return (
      <>
        <h1 className="text-3xl font-bold mt-5 text-gray-800 mb-6 text-center">
          NO timeout Tasks
        </h1>
      </>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Timeout tasks
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimoutTasks;
