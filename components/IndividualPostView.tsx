import React, { useContext } from "react";

import { IPost } from "../typings/interfaces";
import { UserContext } from "../util/context";
import styles from "../styles/PostFeed.module.scss";
import { auth } from "../util/firebase";
import Router from "next/router";
import { handleEdit } from "../util/general";

interface IPostFeedProps {
  posts: IPost[];
  username?: string;
}

function PostView(props: IPostFeedProps) {
  const { user } = useContext(UserContext);

  //   const router = new Router();

  function handleDelete(slug: string) {
    throw new Error("Function not implemented.");
  }
  const { posts, username } = props;

  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.post__container} key={post.slug}>
            {post.uid == auth.currentUser?.uid && (
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
            )}
            <div>
              {/**
               * TODO: Add a link to the user's profile and profile picture
               */}
              <div>PP *</div>
              <h6>{post.username}</h6>
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
