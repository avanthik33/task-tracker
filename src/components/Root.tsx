import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Root: React.FC = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Root;
