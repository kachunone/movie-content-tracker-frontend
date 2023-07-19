"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface AuthLinksProps {
  isDrawer?: boolean;
  closeDrawerHandle?: () => void;
}

const AuthLinks: React.FC<AuthLinksProps> = (props) => {
  const router = useRouter();

  return (
    <div
      className={props.isDrawer ? "flex flex-col gap-2" : "flex flex-row gap-2"}
    >
      <button
        className="bg-yellow-500 rounded p-2 hover:bg-yellow-600"
        onClick={() => {
          router.push("/login");
          if (props.closeDrawerHandle) {
            props.closeDrawerHandle();
          }
        }}
      >
        Login
      </button>
      <button
        className="bg-yellow-500 rounded p-2 hover:bg-yellow-600"
        onClick={() => {
          router.push("/signup");
          if (props.closeDrawerHandle) {
            props.closeDrawerHandle();
          }
        }}
      >
        Sign up
      </button>
    </div>
  );
};

export default AuthLinks;
