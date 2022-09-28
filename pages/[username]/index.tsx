import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import React from "react";
import PostFeed from "../../components/PostFeed";
import ProfileArea from "../../components/ProfileArea";

import { IProfileProps } from "../../typings/interfaces";
import {
  getUserFromUsername,
  PostToJSON,
  UserToJSON,
} from "../../util/firebase";
import style from "../../styles/ProfileArea.module.scss";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username;
  const userDoc = username && (await getUserFromUsername(username));
  console.log("context", context.req);
  let user = null;
  let posts = null;

  if (userDoc) {
    user = UserToJSON(userDoc);
    const postQ = query(
      collection(userDoc.ref, "posts"),
      where("published", "==", true),
      limit(5),
      orderBy("createdAt", "desc")
    );
    //   const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    //     console.log("Current data: ", doc.data());
    // });
    posts = (await getDocs(postQ)).docs.map((po) => {
      return PostToJSON(po);
    });
  }

  return { props: { user, posts, username } };
};

export default function ProfilePage(props: IProfileProps) {
  const { user, posts, username } = props;

  //   console.log(user);
  //   console.log(posts);
  return (
    <div className={style.container}>
      <ProfileArea user={user} />
      <PostFeed posts={posts} username={username} />
    </div>
  );
}
