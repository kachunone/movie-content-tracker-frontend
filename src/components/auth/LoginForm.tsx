"use client";

import React, { useContext, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/auth";
import Modal from "@mui/material/Modal";

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [prompt, setPrompt] = useState({ title: "", message: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submitBtnHandler = async () => {
    if (formData.email === "" || formData.password === "") {
      setPrompt({ title: "Failure", message: "Email/Password can't be empty" });
      handleOpen();
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      setPrompt({ title: "Failure", message: "Please enter a valid email" });
      handleOpen();
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          cache: "no-store",
        }
      );
      const response = await res.json();
      if (response.message === "success") {
        setCookie("token", response.access_token);
        login();
        setUsername(response.username);
        router.refresh();
        router.push("/about");
      } else if (response.statusCode === 401) {
        setPrompt({ title: "Failure", message: "Email/Password is incorrect" });
        handleOpen();
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-myBlueDark rounded-2xl p-7 h-[420px] mt-20">
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
          className="m-3 p-3 border-none rounded-lg w-72 bg-yellow-500 bottom-0"
          onClick={submitBtnHandler}
        >
          Submit
        </button>
      </div>
      <Modal open={open} onClose={handleClose} className="">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4 outline-none">
          <p>{prompt.title}</p>
          <p>{prompt.message}</p>
        </div>
      </Modal>
    </>
  );
}