import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../util/context";

const AuthCheck = (props) => {
  const { username } = useContext(UserContext);
  return username
    ? props.children
    : props.fallback || <Link href={"/login"}>You must be signed in</Link>;
};

export default AuthCheck;
