import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectRouteProps } from "../typesAndInterfaces";

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const loggedUser = localStorage.getItem("loggedUser");

  useEffect(() => {
    if (!loggedUser) {
      navigate("/signin", { replace: true });
    }
  }, [loggedUser, navigate]);

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
