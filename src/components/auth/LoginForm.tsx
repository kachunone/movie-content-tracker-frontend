"use client";

import React, { useContext, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/auth";

interface AuthFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { setUsername, login } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitBtnHandler = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const response = await res.json();
      if (response.message === "success") {
        setCookie("token", response.access_token);
        login();
        setUsername(response.username);
        router.refresh();
        router.push("/about");
      } else if (response.statusCode === 401) {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-myBlueDark rounded-2xl p-7 h-[420px] mt-20">
        <h2 className="text-yellow-500 m-4 text-2xl mb-20 font-semibold">
          Login your account
        </h2>
        <input
          type="text"
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
          className="m-3 p-3 border-none rounded-lg w-72 bg-yellow-500 bottom-0"
          onClick={submitBtnHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
