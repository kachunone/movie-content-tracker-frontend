"use client";

import React, { ReactNode } from "react";
import style from "./MainHeader.module.css";

interface MainHeaderProps {
  children?: ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = (props: MainHeaderProps) => {
  return <header className={style.main_header}>{props.children}</header>;
};

export default MainHeader;
