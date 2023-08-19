"use client";

import React, { useContext, useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthService } from "@/services/Auth";
import { Alert, AlertColor } from "@mui/material";

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

  //modal for prompt
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [prompt, setPrompt] = useState({ severity: "", message: "" });

  //loading modal
  const [isLoading, setIsLoading] = React.useState(false);
  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submitBtnHandler = async () => {
    if (formData.email === "" || formData.password === "") {
      setPrompt({
        severity: "info",
        message: "email/password can't be empty",
      });
      handleOpen();
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      setPrompt({ severity: "warning", message: "Please enter a valid email" });
      handleOpen();
      return;
    }

    try {
      startLoading();
      const response = await AuthService.login(formData);
      endLoading();
      if (response.message === "success") {
        setCookie("token", response.access_token);
        login();
        setUsername(response.username);
        router.refresh();
        router.push("/about");
      } else if (response.statusCode === 401) {
        setPrompt({
          severity: "error",
          message: "email/password is incorrect",
        });
        handleOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-myBlueDark rounded-2xl p-7 h-full mt-20 w-80 max-w-[95vw]">
        <h2 className="text-yellow-500 text-2xl mb-20 font-semibold">
          Login your account
        </h2>
        {open && (
          <Alert
            variant="filled"
            severity={prompt.severity as AlertColor}
            className="mb-6 border-none outline-none rounded-lg w-full"
          >
            {prompt.message}
          </Alert>
        )}
        <div className="flex flex-col w-full gap-6 ">
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
            className="p-3 border-none rounded-lg w-full bg-yellow-500 bottom-0 hover:bg-yellow-700 text-center transition-colors duration-300"
            onClick={submitBtnHandler}
          >
            Submit
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
