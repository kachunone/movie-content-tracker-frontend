import React from "react";
import styles from "./AuthLinks.module.css";

import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

interface AuthLinksProps {
  classname?: string;
}

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "black",
  textTransform: "none",
  backgroundColor: "#FFDB10",
  "&:hover": {
    backgroundColor: "#fca103",
  },
}));

const AuthLinks: React.FC<AuthLinksProps> = (props) => {
  const place = props.classname === "drawer" ? styles.drawer : styles.header;

  return (
    <div className={place}>
      <ColorButton variant="contained">Login</ColorButton>
      <ColorButton variant="contained">Sign up</ColorButton>
    </div>
  );
};

export default AuthLinks;
