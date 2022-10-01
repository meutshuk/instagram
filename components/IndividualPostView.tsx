import React, { useContext } from "react";

import { IPost } from "../typings/interfaces";
import { UserContext } from "../util/context";
import styles from "../styles/PostFeed.module.scss";
import { auth, db } from "../util/firebase";
import Router from "next/router";
import { handleEdit } from "../util/general";
import { deleteDoc, doc } from "firebase/firestore";
import Loader from "./Loader";

interface IPostFeedProps {
  posts: IPost[];
  username?: string;
}

function PostView(props: IPostFeedProps) {
  const { posts } = props;
  const { user, username } = useContext(UserContext);

  const [loading, setLoading] = React.useState(false);

  const handleDelete = async (slug: string) => {
    setLoading(true);
    const postRef = doc(db, "users", user.uid, "posts", slug);
    await deleteDoc(postRef);
    setLoading(false);
    Router.push(`/${username}`);
  };

  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.post__container} key={post.slug}>
            <div className={styles.user__information__container}>
              <div className={styles.user__information}>
                {/**
                 * TODO: Add a link to the user's profile and profile picture
                 */}
                <div>PP *</div>
                <div>{post.username}</div>
              </div>
              {post.uid == auth.currentUser?.uid && (
                <div className={styles.post__container__edit}>
                  <button
                    className={styles.edit__button}
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.delete__button}
                    onClick={() => {
                      handleDelete(post.slug);
                    }}
                  >
                    <div>Delete</div>
                    {loading && <Loader />}
                  </button>
                </div>
              )}
            </div>

            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PostView;
