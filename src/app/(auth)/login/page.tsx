"use client";

import React, { useState } from "react";

// Define the shape of the form data
interface AuthFormData {
  name: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the name and value of the input field from the event
    const { name, value } = event.target;
    // Update the form data state with the new value for the appropriate field
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen mt-16 bg-myBlueLight flex justify-center">
      <form className="flex flex-col items-center bg-myBlueDark rounded-2xl p-7 h-[420px] mt-20">
        <h2 className="text-yellow-500 m-4 text-2xl mb-20 font-semibold">
          Login your account
        </h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="E-mail address"
          className="m-3 p-3 border-none outline-none rounded-lg w-72"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="m-3 p-3 border-none outline-none rounded-lg w-72"
        />
        <button
          type="submit"
          className="m-3 p-3 border-none rounded-lg w-72 bg-yellow-500 bottom-0"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
