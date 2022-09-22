import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";

export const useUserData = () => {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    /**
     * *If user is loggedin then get the username from firestore
     */
    if (user) {
      unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      /**
       * *If user is not loggedin then set username to null
       */
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
};
