import React, { useContext } from "react";
import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";

import styles from "../styles/PostFeed.module.scss";
import { IPost, IUser } from "../typings/interfaces";
import { UserContext } from "../util/context";
import { auth, db } from "../util/firebase";
import Link from "next/link";
import { handleEdit } from "../util/general";
import AuthCheck from "./AuthCheck";
import Heart from "./Heart";

interface IPostFeedProps {
  posts: IPost[];
  // username?: string;
}

function PostFeed(props: IPostFeedProps) {
  const { user, username } = useContext(UserContext);
  const { posts } = props;

  console.log(username);

  // const handleEdit = (slug) => {
  //   console.log("Edit");
  // };

  let postRef: DocumentReference<DocumentData>;

  const handleDelete = async (slug: string) => {
    postRef = doc(db, "users", user.uid, "posts", slug);
    await deleteDoc(postRef);
    console.log("delte", slug);
  };

  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.post__container} key={post.slug}>
            {/* {post.uid == auth.currentUser?.uid && (
              <div className={styles.post__container__edit}>
                <button onClick={() => handleEdit(post.slug, username)}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(post.slug);
                  }}
                >
                  Delete
                </button>
              </div>
            )} */}
            <Heart slug={post.slug} post={post} />
            <h6>{post.username}</h6>
            <Link href={`/${username}/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
            {/* You dont need post content */}
            {/* <p>{post.content}</p> */}
          </div>
        );
      })}
    </div>
  );
}
export default PostFeed;
