import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./SideDrawer.module.css";

interface SideDrawerProps {
  show: boolean;
  children?: React.ReactNode;
}

export default function SideDrawer(props: SideDrawerProps) {
  return (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames={{
        enterActive: styles.enter_active,
        enter: styles.enter,
        exitActive: styles.exit_active,
        exit: styles.exit,
      }}
      mountOnEnter
      unmountOnExit
    >
      <aside className="fixed left-0 top-0 h-screen w-[40%] z-50 bg-myBlueDark flex flex-col">
        {props.children}
      </aside>
    </CSSTransition>
  );
}
