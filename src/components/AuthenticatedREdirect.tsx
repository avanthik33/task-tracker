import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RedirectIfAuthenticated = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("loggedUser");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? children : null;
};

export default RedirectIfAuthenticated;
