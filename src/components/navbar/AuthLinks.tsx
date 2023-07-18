import React from "react";

interface AuthLinksProps {
  isDrawer?: boolean;
}

const AuthLinks: React.FC<AuthLinksProps> = (props) => {
  return (
    <div
      className={props.isDrawer ? "flex flex-col gap-2" : "flex flex-row gap-2"}
    >
      <button className="bg-yellow-500 rounded p-2 hover:bg-yellow-600">
        Login
      </button>
      <button className="bg-yellow-500 rounded p-2 hover:bg-yellow-600">
        Sign up
      </button>
    </div>
  );
};

export default AuthLinks;
