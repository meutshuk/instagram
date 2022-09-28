import React, { useContext, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
const _ = require("lodash");

import { UserContext } from "../../util/context";
import { db } from "../../util/firebase";
import Router from "next/router";
import { IPost } from "../../typings/interfaces";

function NewPost() {
  const { user, username } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let slugValue;

  const onChangeTitle = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    slugValue = _.kebabCase(title);

    const data: IPost = {
      content: content,
      createdAt: serverTimestamp(),
      heartCount: 0,
      published: true,
      slug: slugValue,
      title: title,
      uid: user.uid,
      updatedAt: serverTimestamp(),
      username: username,
    };

    const uid = user.uid;
    const postRef = doc(db, "users", uid, "posts", slugValue);

    await setDoc(postRef, data);

    Router.push(`/${username}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              onChange={onChangeTitle}
              type="text"
              placeholder="Enter title name here"
            />
          </div>
          <div>Extra stuff</div>
          <div>
            <textarea
              onChange={onChangeContent}
              placeholder="Enter content here"
            />
          </div>
        </div>
        <div>
          <button type={"submit"}>submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;
