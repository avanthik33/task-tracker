import React, { useEffect, useState } from "react";
import Error from "../components/Error";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { validateUserInput } from "../utils";
import { signupData } from "../typesAndInterfaces";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<signupData>({
    userId: Math.random() - 0.5,
    username: "",
    email: "",
    phone: "",
    confirmPass: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

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

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPass) {
      setError("password and confirm password in not match!");
      return false;
    }
    const errors = validateUserInput(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors[0]);
      return false;
    }

    setLoading(true);
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("successful signup");
    setLoading(false);
    navigate("signin");
  };

  const handleBlur = () => {
    if (formData.password !== formData.confirmPass) {
      setError("Password and confirm password do not match!");
    }
  };

  return (
    <>
      <h1 className="text-4xl font-semibold text-center text-gray-700 mt-10">
        Sign Up
      </h1>
      {error && (
        <div className="flex m-5 justify-center bg-red-100 text-red-700 p-4 rounded-lg shadow-md mb-4">
          <Error message={error} />
        </div>
      )}

      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <form role="form" onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              required
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              required
              type="text"
              pattern="^\+?[1-9][0-9]{1,14}$"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPass"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              required
              type="password"
              value={formData.confirmPass}
              name="confirmPass"
              onBlur={handleBlur}
              onChange={handleInputChange}
              id="confirmPass"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={!!error || loading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? (
              <CircularProgress size="20px" color="secondary" />
            ) : (
              "signup"
            )}
          </button>
          <div className="text-gray-500 hover:text-blue-500 mt-5 ml-2">
            <Link to="signin">Click here to signin..</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
