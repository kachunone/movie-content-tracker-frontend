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
import Image from "next/image";
import menuIcon from "../../../public/menu_icon.svg";
import disabledIcon from "../../../public/disabled_icon.svg";

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
        <Link href="/" className={styles.title}>
          CineTracker
        </Link>
        <div className={styles.links}>
          {!drawerIsOpen && <NavLinks></NavLinks>}
        </div>
        <div className={styles.auth}>
          {!drawerIsOpen && <AuthLinks classname="header"></AuthLinks>}
        </div>
        <Image
          src={menuIcon}
          width={45}
          height={45}
          alt="Menu"
          color="white"
          onClick={openDrawerHandler}
          className={styles.menu_btn}
        />
      </MainHeader>
      <SideDrawer show={drawerIsOpen}>
        <Image
          src={disabledIcon}
          width={30}
          height={30}
          alt="Menu"
          color="white"
          onClick={closeDrawerHandler}
          className={styles.disabled_btn}
        />
        <p className={`${styles.title_drawer} ${styles.title}`}>CineTracker</p>
        <div className={styles.line}></div>
        <NavLinks classname="drawer" onClick={closeDrawerHandler}></NavLinks>
        <div className={styles.line}></div>
        <div className={styles.auth_container_drawer}>
          <AuthLinks classname="drawer"></AuthLinks>
        </div>
      </SideDrawer>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}
    </React.Fragment>
  );
};

export default Navigation;
