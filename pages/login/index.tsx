import React, { useCallback, useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import Link from "next/link";
import _ from "lodash";
import { Grid, Input, Loading, Button } from "@nextui-org/react";

import Loader from "../../components/Loader";
import { auth, db } from "../../util/firebase";
import styles from "../../styles/Login.module.scss";
import { UserContext } from "../../util/context";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const { user, username } = useContext(UserContext);

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader show />
      </div>
    );
  }

  return user && username ? <RedirectToHome /> : <SignIn />;
}

/**
 * * Sign in Page
 */

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const { user, username } = useContext(UserContext);

  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div>
      {!user && (
        <Button
          icon={<FcGoogle />}
          css={{
            backgroundColor: "white",
            color: "black",
          }}
          onClick={handleLogin}
        >
          Sign in with Google
        </Button>
      )}

      {user && !username && <UsernameForm />}
    </div>
  );
};

/**
 * * Ridirect to Home Page right after login
 */

const RedirectToHome = () => {
  return (
    <Link href={"/"}>
      <div>Redirecting to Home</div>
    </Link>
  );
};

/**
 * * Setup Username
 */
const UsernameForm = () => {
  const [formValue, setFormValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isValidElement, setIsValid] = React.useState(false);

  const { user, username } = useContext(UserContext);

  console.log(user);

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    /**
     * * Adds username and user to firestore in a batch
     * * Reference for batch write -> https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
     */
    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "username", formValue);
    const batch = writeBatch(db);

    const newUser = {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      username: formValue,
      photoURL: user.photoURL,
      createdAt: user.metadata.creationTime,
    };

    batch.set(userDoc, newUser);
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  /**
   * * useCallback is used to prevent infinite loop
   * * _.debounce is used to run the function after 500ms of no input
   * * Reference to check if document exist -> https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
   */
  const checkUsername = useCallback(
    _.debounce(async (username: string) => {
      if (username.length > 4) {
        const usernameRef = doc(db, "usernames", username);
        const docSnap = await getDoc(usernameRef);
        docSnap.exists() ? setIsValid(false) : setIsValid(true);
        setLoading(false);
      }
    }, 500),
    []
  );

  const onChange = (e: { target: { value: string } }) => {
    const val = e.target.value.toLowerCase();

    const reg = /^[a-z0-9_]{5,}$/;

    if (reg.test(val)) {
      setFormValue(val);
      setIsValid(true);
      setLoading(true);
    }
    if (val.length < 5) {
      setFormValue(val);
      setIsValid(false);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <Input
          value={formValue}
          onChange={onChange}
          underlined
          color={formValue.length < 5 || !isValidElement ? "error" : "success"}
          placeholder="Username"
          aria-label="Username"
          width="16rem"
          contentRight={loading && <Loading size="sm" />}
        />
      </div>
      <Button
        color="secondary"
        type="submit"
        disabled={!isValidElement || loading}
      >
        Submit
      </Button>
    </form>
  );
};
