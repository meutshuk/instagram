import {
  collection,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { auth, db } from "../util/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { UserContext } from "../util/context";
import { IPost, IUser } from "../typings/interfaces";

interface IHeartProps {
  post: IPost;
}

const Heart = (props: IHeartProps) => {
  const { post } = props;
  const { user } = useContext(UserContext);

  //   const [userUid, setUserUid] = useState(user?.uid);
  const postRef = doc(db, "users", post.uid, "posts", post.slug);
  const likeRef = collection(postRef, "likes");
  let likeQ;
  if (user) {
    likeQ = query(likeRef, where("uid", "==", user.uid));
  }
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
  const [snapshot, loading, error] = useCollection(likeQ);

  return snapshot?.size ? (
    <RiHeartFill color="red" onClick={removeLike} />
  ) : (
    <RiHeartLine onClick={addLike} />
  );
};

export default Heart;
