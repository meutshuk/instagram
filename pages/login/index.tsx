import React, { useCallback, useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import Link from "next/link";
import _ from "lodash";
import { Grid, Input, Loading, Button } from "@nextui-org/react";

import Loader from "../../components/Loader";
import { auth, db } from "../../util/firebase";
import styles from "../../styles/Login.module.scss";
import { UserContext } from "../../util/context";
import Head from "next/head";
import { TiTick } from "react-icons/ti";
import { ImCheckmark, ImCross } from "react-icons/im";
import Router from "next/router";

export default function Login() {
  const [loading, setLoading] = React.useState(false);
  const { user, username } = useContext(UserContext);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader__text}>
          Checking if you are worthy....
        </div>
        <Loader />
      </div>
    );
  }

  return !user && !username && <SignIn />;
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
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {!user && (
          <button className={styles.signin__container} onClick={handleLogin}>
            <div className={styles.signin__text}>Sign in with Google</div>
            <FcGoogle size={30} />
          </button>
        )}
        {user && !username && <UsernameForm />}
      </div>
    </div>
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
      createdAt: serverTimestamp(),
    };

    batch.set(userDoc, newUser);
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();

    Router.push("/");
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
        const usernameRef = doc(db, "username", username);
        const docSnap = await getDoc(usernameRef);
        console.log(docSnap.exists());
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
        <div className={styles.username__text}>Enter Username</div>
        <div className={styles.username__container}>
          <input
            className={styles.username__input}
            type="text"
            value={formValue}
            onChange={onChange}
            placeholder="Username"
          />
          {loading && <Loader />}
          {!loading && isValidElement && (
            <ImCheckmark color="green" size={30} />
          )}
          {!loading && !isValidElement && <ImCross color="red" size={30} />}
        </div>
      </div>

      <button
        className={styles.button__submit}
        type="submit"
        disabled={!isValidElement || loading}
      >
        Submit
      </button>
    </form>
  );
};
