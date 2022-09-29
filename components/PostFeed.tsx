import React, { useContext, useState } from "react";
import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";

import styles from "../styles/PostFeed.module.scss";
import { IPost, IUser } from "../typings/interfaces";
import { UserContext } from "../util/context";
import { auth, db, getUserFromUsername, UserToJSON } from "../util/firebase";
import Link from "next/link";
import Heart from "./Heart";
import Image from "next/image";

interface IPostFeedProps {
  posts: IPost[];
  // username?: string;
}
function PostFeed(props: IPostFeedProps) {
  const [loading, setLoading] = useState(false);
  // const [profilePic, setProfilePic] = useState("");
  const { user, username } = useContext(UserContext);
  // const [postUsername, setPostUsername] = useState("");
  const { posts } = props;

  let postRef: DocumentReference<DocumentData>;

  const handleDelete = async (slug: string) => {
    postRef = doc(db, "users", user.uid, "posts", slug);
    await deleteDoc(postRef);
  };

  const postUser = async (username: string) => {
    const userDoc = await getUserFromUsername(username);
    const user = UserToJSON(userDoc);
    setLoading(false);
    return user;
  };

  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.post__container} key={post.slug}>
            <div className={styles.container__userdetails}>
              <div className={styles.userdetails__name}>
                <Link href={`/${post.username}`}>
                  <div className={styles.name__username}>{post.username}</div>
                </Link>
              </div>

              <Heart slug={post.slug} post={post} />
            </div>

            <div className={styles.post__container}>
              <Link href={`/${post.username}/${post.slug}`}>
                <div className={styles.post}>{post.title}</div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default PostFeed;
