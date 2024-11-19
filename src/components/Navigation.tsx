import { NavLink, useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("clicked logout");
    localStorage.removeItem("loggedUser");
    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center bg-slate-500 py-3 px-8 shadow-lg h-24">
      <ul className="flex space-x-10">
        <li className="text-white font-semibold text-lg hover:bg-slate-700 rounded-lg transition duration-200 ease-in-out transform">
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive
                ? "bg-slate-700 text-white px-4 py-2 rounded-lg"
                : "text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            }
            end
          >
            Home
          </NavLink>
        </li>

        <li className="text-white font-semibold text-lg hover:bg-slate-700 rounded-lg transition duration-200 ease-in-out transform">
          <NavLink
            to="pending"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-700 text-white px-4 py-2 rounded-lg"
                : "text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            }
          >
            Pending
          </NavLink>
        </li>

        <li className="text-white font-semibold text-lg hover:bg-slate-700 rounded-lg transition duration-200 ease-in-out transform">
          <NavLink
            to="completed"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-700 text-white px-4 py-2 rounded-lg"
                : "text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            }
          >
            Completed
          </NavLink>
        </li>

        <li className="text-white font-semibold text-lg hover:bg-slate-700 rounded-lg transition duration-200 ease-in-out transform">
          <NavLink
            to="timeout"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-700 text-white px-4 py-2 rounded-lg"
                : "text-white hover:bg-slate-700 px-4 py-2 rounded-lg transition duration-200 ease-in-out"
            }
          >
            Timeout
          </NavLink>
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
  );
};

export default Navigation;
