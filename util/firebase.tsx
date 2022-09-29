import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  limit,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv_bj_S28prHHFwb2PnFjyFbeERKCVPrE",
  authDomain: "instagram-4aea3.firebaseapp.com",
  projectId: "instagram-4aea3",
  storageBucket: "instagram-4aea3.appspot.com",
  messagingSenderId: "276440866991",
  appId: "1:276440866991:web:e8a9570f7a71114269345a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const getServerTimeStamp = serverTimestamp();
/**
 * * Get a user with username
 */
export const getUserFromUsername = async (username: string | string[]) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = await getDocs(q);
  return userDoc.docs[0];
};

/**
 * * Converts a firestore document to JSON
 * @param doc - DocumentSnapshot
 * @returns - JSON data of the document
 */
export const PostToJSON = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
};

export const UserToJSON = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
  };
};

export const getPostsfromUsername = async (username: string) => {
  const userDoc = await getUserFromUsername(username);
  const postsRef = collection(userDoc.ref, "posts");
  const q = query(postsRef, where("published", "==", true), limit(5));
  const posts = await getDocs(q);
  return posts;
};

export const getProfileUrl = async (username: string) => {
  const userDoc = await getUserFromUsername(username);
  const JSONUser = UserToJSON(userDoc);
  // return JSONUser;
};

export const getPublishedPosts = async () => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("published", "==", true), limit(5));
  const posts = await getDocs(q);
  return posts;
};
