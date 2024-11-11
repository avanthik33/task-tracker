import React from "react";

type errorMessage = { message: string };

const Error: React.FC<errorMessage> = ({ message }) => {
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default Error;
