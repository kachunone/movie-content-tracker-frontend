"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthService } from "@/services/Auth";

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

  //modal for prompt
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowLoginLink(false);
  };
  const [prompt, setPrompt] = useState({ title: "", message: "" });
  const [showLoginLink, setShowLoginLink] = useState(false);

  //loading modal
  const [isLoading, setIsLoading] = React.useState(false);
  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitBtnHandler = async () => {
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      setPrompt({
        title: "Failure",
        message: "Username/Email/Password can't be empty",
      });
      handleOpen();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setPrompt({ title: "Failure", message: "Please enter a valid email" });
      handleOpen();
      return;
    }

    try {
      startLoading();
      const response = await AuthService.signup(formData);
      endLoading();
      if (response.statusCode === 200) {
        setPrompt({
          title: "Success",
          message: "Account created, Please log in your account",
        });
        setShowLoginLink(true);
      } else if (response.statusCode === 400) {
        setPrompt({
          title: "Failure",
          message: response.message,
        });
      } else {
        setPrompt({
          title: "Failure",
          message: "Unknown reason",
        });
      }
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-myBlueDark rounded-2xl p-7 h-[440px] mt-20 w-80 max-w-[95vw]">
        <h2 className="text-yellow-500 text-2xl mb-20 font-semibold">
          Create an account
        </h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Username"
          className="m-3 p-3 border-none outline-none rounded-lg w-full"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="E-mail address"
          className="m-3 p-3 border-none outline-none rounded-lg w-full"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="m-3 p-3 border-none outline-none rounded-lg w-full"
        />
        <button
          className="m-3 p-3 border-none rounded-lg bg-yellow-500 w-full hover:bg-yellow-700 text-center transition-colors duration-300"
          onClick={submitBtnHandler}
        >
          Sign Up
        </button>
      </div>
      <Modal open={open} onClose={handleClose} className="">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4 outline-none">
          <p>{prompt.title}</p>
          <p>{prompt.message}</p>
          {showLoginLink && (
            <Link href={"/login"} className="underline text-white m-2">
              Login
            </Link>
          )}
        </div>
      </Modal>
      <Modal open={isLoading}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-myBlueLight text-yellow-500 flex flex-col items-center rounded-lg p-4 outline-none">
          <CircularProgress color="success" />
        </div>
      </Modal>
    </>
  );
}
