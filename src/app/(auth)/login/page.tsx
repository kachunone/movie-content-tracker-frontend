import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  console.log("login page called");
  return (
    <div className="min-h-screen mt-16 bg-myBlueLight flex justify-center">
      <LoginForm></LoginForm>
    </div>
  );
}
