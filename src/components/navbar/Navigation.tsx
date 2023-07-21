"use client";

import React from "react";
import Link from "next/link";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import AuthLinks from "./AuthLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import styles from "./Navigation.module.css";
import { useState } from "react";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import MenuIcon from "@mui/icons-material/Menu";
import { MovieCreation } from "@mui/icons-material";

const Navigation: React.FC = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      <MainHeader>
        <div className={styles.title_container}>
          <MovieCreation
            className={styles.movie_icon}
            style={{ width: "2rem", height: "2rem", color: "#ffdb10" }}
          ></MovieCreation>
          <Link href="/" className={styles.title}>
            CineTracker
          </Link>
        </div>
        <div className={styles.links}>
          {!drawerIsOpen && <NavLinks></NavLinks>}
        </div>
        <div className={styles.auth}>
          {!drawerIsOpen && <AuthLinks></AuthLinks>}
        </div>
        <div className={styles.menu_btn}>
          <MenuIcon
            onClick={openDrawerHandler}
            style={{ width: "2.5rem", height: "2.5rem" }}
            className="text-yellow-500 hover:text-yellow-600"
          ></MenuIcon>
        </div>
      </MainHeader>

      <SideDrawer show={drawerIsOpen}>
        <DisabledByDefaultRoundedIcon
          className="absolute right-2 top-2 cursor-pointer text-yellow-500 hover:text-yellow-600 w-8 h-8 text-center transition-colors duration-300"
          onClick={closeDrawerHandler}
        ></DisabledByDefaultRoundedIcon>
        <p className={`${styles.title_drawer} ${styles.title}`}>CineTracker</p>
        <div className={styles.line}></div>
        <NavLinks classname="drawer" onClick={closeDrawerHandler}></NavLinks>
        <div className={styles.auth_container_drawer}>
          <AuthLinks
            isDrawer={true}
            closeDrawerHandle={closeDrawerHandler}
          ></AuthLinks>
        </div>
      </SideDrawer>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}
    </React.Fragment>
  );
};

export default Navigation;
