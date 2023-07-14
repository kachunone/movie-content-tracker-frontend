import React from "react";
import styles from "./NavLinks.module.css";
import Link from "next/link";

interface NavLinksProps {
  classname: string;
}

const NavLinks: React.FC<NavLinksProps> = (props) => {
  const className =
    props.classname === "drawer" ? styles.drawer : styles.header;

  return (
    <div>
      <Link href="/" className={`${styles.nav_links} ${className}`}>
        Home
      </Link>
      <Link href="/discovery" className={`${styles.nav_links} ${className}`}>
        Movies
      </Link>
    </div>
  );
};

export default NavLinks;
