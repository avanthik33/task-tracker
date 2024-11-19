import React from "react";
import { errorMessage } from "../typesAndInterfaces";

const Error: React.FC<errorMessage> = ({ message }) => {
  return (
    <div>
      <h1 data-testid={"error-heading"}>{message}</h1>
    </div>
  );
};

export default Error;
