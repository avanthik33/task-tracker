import React, { useState } from "react";

interface inputState {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const [input, setInput] = useState<inputState>({ email: "", password: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submitted");
  };
  console.log(input);
  return (
    <>
      <h1>Signin</h1>

      <div className="">
        <form onSubmit={handleSumbitForm}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <button>Signin</button>
        </form>
      </div>
    </>
  );
};

export default Signin;
