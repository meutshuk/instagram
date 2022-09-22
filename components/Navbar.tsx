import React from "react";
import { UserContext } from "../util/context";
import styles from "../styles/Navbar.module.scss";
import Link from "next/link";
import { auth, getUserFromUsername } from "../util/firebase";
import Image from "next/image";

function Navbar() {
  const { user, username } = React.useContext(UserContext);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className={styles.navbar}>
      <Link href={"/"}>
        <div>Logo</div>
      </Link>

      {user ? (
        <ul>
          <Link href={`/${username}`}>
            <Image
              src={user.photoURL}
              alt="profile pic"
              height={50}
              width={50}
            />
          </Link>
          <li onClick={signOut}>Sign Out</li>
        </ul>
      ) : (
        <ul>
          <Link href={"login"}>
            <li>Sign In</li>
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
