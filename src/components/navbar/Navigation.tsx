"use client";

import React, { useContext } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import AuthLinks from "./AuthLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import { useState } from "react";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { MovieCreation, Route } from "@mui/icons-material";
import { AuthContext } from "@/app/context/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Navigation() {
  const router = useRouter();
  const { isLoggedIn, logout, login } = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  console.log(isLoggedIn);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <div className="w-full h-16 fixed top-0 left-0 bg-myBlueDark z-50 flex justify-center">
      <div className=" w-5/6 h-16 flex items-center justify-center md:justify-between">
        <div className="flex flex-row justify-center items-center">
          <MovieCreation
            className="m-2"
            style={{ width: "2rem", height: "2rem", color: "#ffdb10" }}
          ></MovieCreation>
          <Link href="/" className="text-yellow-400 text-xl no-underline">
            CineTracker
          </Link>
        </div>
        <div className="hidden md:block">
          {!drawerIsOpen && <NavLinks></NavLinks>}
        </div>
        <div className="hidden md:block">
          {!drawerIsOpen && !isLoggedIn && <AuthLinks></AuthLinks>}
          {isLoggedIn && (
            <button
              className="bg-yellow-500 rounded p-2 hover:bg-yellow-700 text-center transition-colors duration-300"
              onClick={() => {
                logout();
                deleteCookie("token");
                router.refresh();
                router.replace("/");
              }}
            >
              Logout
            </button>
          )}
        </div>

        <div className="md:hidden block absolute left-5">
          <MenuIcon
            onClick={openDrawerHandler}
            style={{ width: "2.5rem", height: "2.5rem" }}
            className="text-yellow-500 hover:text-yellow-700 cursor-pointer transition-colors duration-300"
          ></MenuIcon>
        </div>
      </div>

      <SideDrawer show={drawerIsOpen}>
        <DisabledByDefaultRoundedIcon
          className="absolute right-2 top-2 cursor-pointer text-yellow-500 hover:text-yellow-600 w-8 h-8 text-center transition-colors duration-300"
          onClick={closeDrawerHandler}
        ></DisabledByDefaultRoundedIcon>
        <p className="flex justify-center mt-14 text-yellow-400 rounded-md text-2xl">
          CineTracker
        </p>
        <div className="border-t-2 border-yellow-400 my-4 m-2"></div>
        <NavLinks isDrawer={true} onClick={closeDrawerHandler}></NavLinks>
        <div className="m-2">
          {!isLoggedIn && (
            <AuthLinks
              isDrawer={true}
              closeDrawerHandle={closeDrawerHandler}
            ></AuthLinks>
          )}
          {isLoggedIn && (
            <button
              className="bg-yellow-500 rounded p-2 w-full hover:bg-yellow-700 text-center transition-colors duration-300"
              onClick={() => {
                logout();
                deleteCookie("token");
                router.refresh();
                router.replace("/");
              }}
            >
              Logout
            </button>
          )}
        </div>
      </SideDrawer>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}
    </div>
  );
}
