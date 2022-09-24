import { collection, getDocs, limit, query, where } from "firebase/firestore";
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

  let user = null;
  let posts = null;

  if (userDoc) {
    user = UserToJSON(userDoc);
    const postQ = query(
      collection(userDoc.ref, "posts"),
      where("published", "==", true),
      limit(5)
    );
    posts = (await getDocs(postQ)).docs.map((po) => {
      return PostToJSON(po);
    });
  }

  return { props: { user, posts } };
};

export default function ProfilePage(props: IProfileProps) {
  const { user, posts } = props;

  //   console.log(user);
  //   console.log(posts);
  return (
    <div className={style.container}>
      <ProfileArea user={user} />
      <PostFeed posts={posts} />
    </div>
  );
}
