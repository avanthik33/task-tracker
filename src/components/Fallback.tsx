import React from "react";

const Fallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Incorrect path</h1>
      <p className="text-lg text-gray-700 mb-6">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Go to Home
      </a>
    </div>
  );
};

export default Fallback;
