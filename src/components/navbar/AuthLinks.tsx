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
        <div className="flex justify-center items-center">
          <p className="flex items-center justify-center text-white text-xl">
            {loggedInUser.charAt(0).toUpperCase() +
              loggedInUser.slice(1).toLowerCase()}
          </p>
          <Link
            href={"/watchlist"}
            className="m-4 hover:text-white transition-colors duration-300 text-yellow-500"
          >
            Your&nbsp;List
          </Link>
          <button
            className="bg-yellow-500 rounded p-2 hover:bg-yellow-700 text-center transition-colors duration-300"
            onClick={() => {
              logout();
              setUsername("");
              deleteCookie("token");
              router.refresh();
              router.replace("/");
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
