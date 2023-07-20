"use client";

import React from "react";
import Link from "next/link";

interface AuthLinksProps {
  isDrawer?: boolean;
  closeDrawerHandle?: () => void;
}

const AuthLinks: React.FC<AuthLinksProps> = (props) => {
  return (
    <div
      className={props.isDrawer ? "flex flex-col gap-2" : "flex flex-row gap-2"}
    >
      <Link
        href={"/login"}
        className="bg-yellow-500 rounded p-2 hover:bg-yellow-600 text-center"
        onClick={() => {
          if (props.closeDrawerHandle) {
            props.closeDrawerHandle();
          }
        }}
      >
        Login
      </Link>
      <Link
        href={"/signup"}
        className="bg-yellow-500 rounded p-2 hover:bg-yellow-600 text-center"
        onClick={() => {
          if (props.closeDrawerHandle) {
            props.closeDrawerHandle();
          }
        }}
      >
        Sign up
      </Link>
    </div>
  );
};

export default AuthLinks;
