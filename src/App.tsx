// src/App.tsx
import React, { useEffect, useState } from "react";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
