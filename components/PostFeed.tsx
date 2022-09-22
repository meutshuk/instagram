import React from "react";

function PostFeed(props) {
  const { posts } = props;
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.slug}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PostFeed;
