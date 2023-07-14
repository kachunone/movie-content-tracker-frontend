import React from "react";
import styles from "./NavLinks.module.css";
import Link from "next/link";

interface NavLinksProps {
  classname?: string;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = (props) => {
  const className = props.classname === "drawer" ? styles.drawer : undefined;
  const onClickFunc = props.classname === "drawer" ? props.onClick : undefined;

  return (
    <div className={styles.container}>
      <Link
        href="/"
        className={`${styles.nav_links} ${className}`}
        onClick={onClickFunc}
      >
        Home
      </Link>
      <Link
        href="/movies"
        className={`${styles.nav_links} ${className}`}
        onClick={onClickFunc}
      >
        Movies
      </Link>
    </div>
  );
};

export default NavLinks;
