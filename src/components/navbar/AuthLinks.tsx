"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/context/auth";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

interface AuthLinksProps {
  isDrawer?: boolean;
  closeDrawerHandle?: () => void;
}

export default function AuthLinks(props: AuthLinksProps) {
  const router = useRouter();
  const { isLoggedIn, logout, setUsername, loggedInUser } =
    useContext(AuthContext);

  return (
    <div
      className={props.isDrawer ? "flex flex-col gap-2" : "flex flex-row gap-2"}
    >
      {!isLoggedIn && (
        <>
          <Link
            href={"/login"}
            className={`bg-yellow-500 rounded p-2 hover:bg-yellow-700 text-center transition-colors duration-300 ${
              props.isDrawer ? "w-full" : "w-20"
            }`}
            onClick={props.closeDrawerHandle}
          >
            Login
          </Link>
          <Link
            href={"/signup"}
            className={`bg-yellow-500 rounded p-2 hover:bg-yellow-700 text-center transition-colors duration-300 ${
              props.isDrawer ? "w-full" : "w-20"
            }`}
            onClick={props.closeDrawerHandle}
          >
            Sign up
          </Link>
        </>
      )}
      {isLoggedIn && (
        <p className="text-white self-center m-2 text-xl">
          {loggedInUser.toUpperCase()}
        </p>
      )}
      {isLoggedIn && (
        <button
          className="bg-yellow-500 rounded p-2 w-full hover:bg-yellow-700 text-center transition-colors duration-300"
          onClick={() => {
            logout();
            setUsername("");
            deleteCookie("token");
            router.refresh();
            router.replace("/");
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
