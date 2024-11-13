import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Root from "../components/Root";
import Home from "../pages/Home";
import PendingTasks from "../pages/PendingTasks";
import CompletedTasks from "../pages/CompletedTasks";
import TimoutTasks from "../pages/TimoutTasks";
import Fallback from "../components/Fallback";
import { ProtectRoute } from "../components/ProtectRoute";

export const router = createBrowserRouter([
  {
    index: true,
    element: <Signup />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "home",
    element: (
      <ProtectRoute>
        <Root />
      </ProtectRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "pending", element: <PendingTasks /> },
      { path: "completed", element: <CompletedTasks /> },
      { path: "timeout", element: <TimoutTasks /> },
    ],
  },
  { path: "*", element: <Fallback /> },
]);
