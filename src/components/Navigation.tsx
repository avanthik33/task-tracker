import { Link, useNavigate } from "react-router-dom";

type User = {
  email: string;
  password: string;
};

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("clicked logout");
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter(
      (item: User) => item.email !== loggedUser.email
    );
    console.log(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("loggedUser");
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-between items-center bg-slate-500 py-3 px-8 shadow-lg h-24">
        <ul className="flex space-x-10 ">
          <li className="text-white font-semibold text-lg hover:bg-slate-700  rounded-lg transition duration-200 ease-in-out transform">
            <Link className="px-4 py-2" to="">
              Home
            </Link>
          </li>
          <li className="text-white font-semibold text-lg hover:bg-slate-700  rounded-lg transition duration-200 ease-in-out transform">
            <Link className="px-4 py-2" to="pending">
              Pending
            </Link>
          </li>
          <li className="text-white font-semibold text-lg hover:bg-slate-700 rounded-lg transition duration-200 ease-in-out transform">
            <Link className="px-4 py-2" to="completed">
              Completed
            </Link>
          </li>
          <li className="text-white font-semibold text-lg hover:bg-slate-700  rounded-lg transition duration-200 ease-in-out transform">
            <Link className="px-4 py-2" to="timeout">
              Timeout
            </Link>
          </li>
        </ul>

        <div className="ml-auto">
          <button
            className="text-red-900 bg-red-100 font-semibold text-lg hover:bg-white hover:text-red-800 px-4 py-1 rounded-sm transition duration-200 ease-in-out transform"
            onClick={handleLogout}
          >
            SignOut
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
