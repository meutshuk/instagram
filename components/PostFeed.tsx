import React from "react";
import styles from "../styles/PostFeed.module.scss";

function PostFeed(props) {
  const { posts } = props;
  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.post__container} key={post.slug}>
            <h6>{post.username}</h6>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
export default PostFeed;
