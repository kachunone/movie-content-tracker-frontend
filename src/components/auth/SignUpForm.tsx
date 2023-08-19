"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthService } from "@/services/Auth";
import { Alert, AlertColor } from "@mui/material";

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
  const [prompt, setPrompt] = useState({ severity: "", message: "" });
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
        severity: "info",
        message: "username/email/password can't be empty",
      });
      handleOpen();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setPrompt({ severity: "info", message: "Email Format Invalid" });
      handleOpen();
      return;
    }

    try {
      startLoading();
      const response = await AuthService.signup(formData);
      endLoading();
      if (response.statusCode === 200) {
        setPrompt({
          severity: "success",
          message: "Account Created",
        });
        setShowLoginLink(true);
      } else if (response.statusCode === 400) {
        setPrompt({
          severity: "error",
          message: response.message,
        });
      } else {
        setPrompt({
          severity: "error",
          message: "Unknown Reason",
        });
      }
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-myBlueDark rounded-2xl p-7 h-full mt-20 w-80 max-w-[95vw]">
        <h2 className="text-yellow-500 text-2xl mb-20 font-semibold">
          Create an account
        </h2>
        {open && (
          <Alert
            variant="filled"
            severity={prompt.severity as AlertColor}
            className="mb-6 border-none outline-none rounded-lg w-full"
          >
            {prompt.message}
            {showLoginLink && (
              <Link href={"/login"} className="underline text-white m-2">
                Login
              </Link>
            )}
          </Alert>
        )}
        <div className="flex flex-col w-full gap-6 ">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Username"
            className="p-3 border-none outline-none rounded-lg w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="E-mail address"
            className="p-3 border-none outline-none rounded-lg w-full"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="p-3 border-none outline-none rounded-lg w-full"
          />
          <button
            className="p-3 border-none rounded-lg bg-yellow-500 w-full hover:bg-yellow-700 text-center transition-colors duration-300"
            onClick={submitBtnHandler}
          >
            Sign Up
          </button>
        </div>
      </div>
      <Modal open={isLoading}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500">
          <CircularProgress style={{ color: "#FFDB0E" }} />
        </div>
      </Modal>
    </>
  );
}
