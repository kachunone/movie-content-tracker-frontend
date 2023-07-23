import React from "react";
import Link from "next/link";

interface NavLinksProps {
  isDrawer?: boolean;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = (props) => {
  return (
    <div
      className={`h-full text-yellow-500 no-underline overflow-auto scrollbar-none ${
        props.isDrawer ? "flex flex-col items-center" : ""
      }`}
    >
      <Link
        href="/"
        className="m-2 hover:text-white transition-colors duration-300"
        onClick={props.onClick}
      >
        Discover
      </Link>
      <Link
        href="/about"
        className="m-2 hover:text-white transition-colors duration-300"
        onClick={props.onClick}
      >
        About
      </Link>
    </div>
  );
};

export default NavLinks;
