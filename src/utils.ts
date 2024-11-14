import { signupData } from "./typesAndInterfaces";


export const validateUserInput = ({
  username,
  email,
  password,
  phone,
}: signupData) => {
  const errors = [];

  if (!username) errors.push("Username is required.");
  else if (username.length < 3)
    errors.push("Username must be at least 3 characters long.");

  if (!email) errors.push("Email is required.");
  else if (!/\S+@\S+\.\S+/.test(email)) errors.push("Invalid email format.");

  if (!phone) {
    errors.push("Phone number is required.");
  } else if (!/^\d+$/.test(phone)) {
    errors.push("Phone number must only contain digits.");
  } else if (phone.length < 10) {
    errors.push("Phone number must be at least 10 digits long.");
  }

  if (!password) errors.push("Password is required.");
  else if (password.length < 8)
    errors.push("Password must be at least 8 characters long.");

  return errors;
};
