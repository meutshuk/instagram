import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../util/context";

interface IAuthCheckProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthCheck = (props: IAuthCheckProps) => {
  // const { children, fallback } = props;

  const { username } = useContext(UserContext);
  return (
    <div>
      {username
        ? props.children
        : props.fallback || <Link href={"/login"}>You must be signed in</Link>}
    </div>
  );
};

export default AuthCheck;
