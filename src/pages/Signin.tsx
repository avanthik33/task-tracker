import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import { Link, useNavigate } from "react-router-dom";

interface inputState {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<inputState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const errorTimout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => {
        clearTimeout(errorTimout);
      };
    }
  }, [error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError("fill all input fields!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (item: inputState) =>
        item.email === formData.email && item.password === formData.password
    );
    if (user) {
      console.log("success");
      localStorage.setItem("loggedUser", JSON.stringify(formData));
      navigate("/home");
    } else {
      setError("Incorrect Email or Password");
      console.log("unautherized login");
      setFormData({
        email: "string",
        password: "string",
      });
      return;
    }
  };
  console.log(formData);
  return (
    <>
      <h1 className="text-4xl font-semibold mt-10 text-center text-gray-700">
        SignIn
      </h1>
      {error && (
        <div className="flex m-5 justify-center bg-red-100 text-red-700 p-4 rounded-lg shadow-md mb-4">
          <Error message={error} />
        </div>
      )}
      <div className=" max-w-md shadow-lg mt-8 p-5 mx-auto rounded-lg bg-white">
        <form onSubmit={handleSumbitForm}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2 "
            >
              Email
            </label>
            <input
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-sm text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              required
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            disabled={!!error}
            className="w-full px-4 py-2 bg-gray-400 text-white rounded-md font-semibold disabled:opacity-50  hover:bg-green-600"
          >
            Signin
          </button>
          <div className="text-gray-500 hover:text-blue-500 mt-5 ml-2">
            <Link to="/">Click here to create account..</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
