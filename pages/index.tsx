import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import styles from "../styles/Home.module.css";
import { UserContext } from "../util/context";
import Button from "@mui/material/Button";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";

const Home: NextPage = () => {
  const { user, username } = useContext(UserContext);
  console.log(user);

  if (!user) {
    //redirect to login page

    redirect: {
      destination: "/login";
      permanent: false;
    }

    return (
      <div>
        <h1>Please login</h1>
        <Link href={"/login"}>
          <Button variant="contained">Redirect to Login</Button>
        </Link>
      </div>
    );
  }

  return <div>Home</div>;
};

export default Home;
