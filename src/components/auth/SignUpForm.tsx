"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Define the shape of the form data
interface AuthFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitBtnHandler = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
        cache: "no-store",
      });
      const response = await res.json();
      if (response.statusCode == 200) {
        // router.refresh();
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-myBlueDark rounded-2xl p-7 h-[500px] mt-20">
        <h2 className="text-yellow-500 m-4 text-2xl mb-20 font-semibold">
          Create an account
        </h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Username"
          className="m-3 p-3 border-none outline-none rounded-lg w-72"
        />
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
          className="m-3 p-3 border-none rounded-lg w-72 bg-yellow-500"
          onClick={submitBtnHandler}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
