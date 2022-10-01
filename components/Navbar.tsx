import React from "react";
import { UserContext } from "../util/context";
import styles from "../styles/Navbar.module.scss";
import Link from "next/link";
import { auth, getUserFromUsername } from "../util/firebase";
import Image from "next/image";
import Button from "./Button";
import { RiCodeSSlashLine } from "react-icons/ri";

interface INavbarProps {
  user: any | null;
  username: string | null;
}

function Navbar(props: INavbarProps) {
  const { user, username } = props;

  const signOut = () => {
    auth.signOut();
  };
  // return {!user && !username && return <div>loading...</div>}
  // if (!user) {
  //   return (
  //     <nav className={styles.navbar}>
  //       <div className={styles.navbar__container}></div>
  //     </nav>
  //   );
  // }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <Link href={"/"}>
          <div className={styles.logo}>
            <RiCodeSSlashLine size={30} color="white" />
          </div>
        </Link>
        {user ? (
          <ul className={styles.loggedin}>
            {username && (
              <li className={styles.loggedin__username}>
                <Link href={`/${username}`}>
                  <Image
                    className={styles.username__image}
                    src={user.photoURL}
                    alt="profile pic"
                    height={50}
                    width={50}
                  />
                </Link>
                <Link href={"/new"}>
                  <div className={styles["loggedin__username-new-post"]}>
                    New Post
                  </div>
                </Link>
              </li>
            )}
            <li className={styles.signout} onClick={signOut}>
              Sign Out
            </li>
          </ul>
        ) : (
          <ul>
            <Link href={"login"}>
              <li className={styles.signin}>Sign In</li>
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
