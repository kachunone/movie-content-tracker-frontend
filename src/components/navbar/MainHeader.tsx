import React, { ReactNode } from "react";

interface MainHeaderProps {
  children?: ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = (props: MainHeaderProps) => {
  return <header className="">{props.children}</header>;
};

export default MainHeader;
