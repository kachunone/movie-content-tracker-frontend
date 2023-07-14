import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./SideDrawer.module.css";

interface SideDrawerProps {
  show: boolean;
  children?: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = (props: SideDrawerProps) => {
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
      <aside className={styles.side_drawer}>{props.children}</aside>
    </CSSTransition>
  );
};

export default SideDrawer;
