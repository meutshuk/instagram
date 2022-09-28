import {
  collection,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useContext } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { auth, db } from "../util/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { UserContext } from "../util/context";
 function Heart(props) {
  const { slug, post } = props;
  const { user } = useContext(UserContext);

  const postRef = doc(db, "users", post.uid, "posts", slug);
  const likeRef = collection(postRef, "likes");

  const batch = writeBatch(db);

  const removeLike = async () => {
    const uid = user.uid;
    batch.update(postRef, {
      heartCount: increment(-1),
    });
    batch.delete(doc(likeRef, uid));
    await batch.commit();
  };

  const addLike = async () => {
    const uid = user.uid;
    batch.update(postRef, {
      heartCount: increment(1),
    });
    batch.set(doc(likeRef, uid), {
      uid,
    });
    await batch.commit();
  };
const [snapshot, loading, error] = useDocument(likeRef);

  return snapshot?.size ? (
    <RiHeartFill color="red" onClick={removeLike} />
  ) : (
    <RiHeartLine onClick={addLike} />
  );
}

export default Heart;
