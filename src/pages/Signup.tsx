import React, { useState } from "react";

interface signupData {
  username: string;
  email: string;
  phone: number;
  confirmPass: string;
  password: string;
}
const Signup: React.FC = () => {
  const [input, setInput] = useState<signupData>({
    username: "",
    email: "",
    phone: 0,
    confirmPass: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSumbitForm = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <h1>signup</h1>
      <div className="">
        <form onSubmit={handleSumbitForm}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={handleInputChange}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleInputChange}
          />
          <label htmlFor="">Phone</label>
          <input
            type="number"
            name="phone"
            value={input.phone}
            onChange={handleInputChange}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
          />
          <label htmlFor="">Confirm password</label>
          <input
            type=""
            value={input.confirmPass}
            name="confirmPass"
            onChange={handleInputChange}
          />
          <button>Signup</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
