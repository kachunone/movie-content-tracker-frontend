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
import { MovieCreation } from "@mui/icons-material";
export default function Navigation() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

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
          {!drawerIsOpen && <AuthLinks></AuthLinks>}
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
          <AuthLinks
            isDrawer={true}
            closeDrawerHandle={closeDrawerHandler}
          ></AuthLinks>
        </div>
      </SideDrawer>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}
    </div>
  );
}
