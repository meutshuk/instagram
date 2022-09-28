import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { GetServerSideProps } from "next/types";
import React from "react";
import PostFeed from "../../components/PostFeed";
import ProfileArea from "../../components/ProfileArea";
import { IPost, IUser } from "../../typings/interfaces";
import {
  getUserFromUsername,
  PostToJSON,
  UserToJSON,
} from "../../util/firebase";
import style from "../../styles/ProfileArea.module.scss";
import PostView from "../../components/IndividualPostView";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  //   const username = context.query.username;
  let userDoc;
  if (params?.username) {
    userDoc = await getUserFromUsername(params.username);
  }

  let user = null;
  let post = null;

  if (userDoc) {
    user = UserToJSON(userDoc);
    const postQ = query(
      collection(userDoc.ref, "posts"),
      where("slug", "==", params?.slug),
      limit(5)
    );
    //   const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    //     console.log("Current data: ", doc.data());
    // });
    post = (await getDocs(postQ)).docs.map((po) => {
      return PostToJSON(po);
    });
  }

  return { props: { user, post } };
};

interface ISlugProps {
  user: IUser;
  post: IPost[];
}

const Posts = (props: ISlugProps) => {
  const { user, post } = props;

  //   console.log(user);
  //   console.log(posts);
  return (
    <div className={style.container}>
      <ProfileArea user={user} />
      {/* <PostFeed posts={post} /> */}
      <PostView posts={post} />
    </div>
  );
};

export default Posts;
