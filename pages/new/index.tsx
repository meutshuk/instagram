import React, { useContext, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
const _ = require("lodash");
import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";

import { UserContext } from "../../util/context";
import { db } from "../../util/firebase";
import Router from "next/router";
import { IPost } from "../../typings/interfaces";
import { Input, Switch } from "@nextui-org/react";
import styles from "../../styles/NewPost.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import EditScreen from "../../components/EditScreen";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

function NewPost() {
  const { user, username } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("# Hello World");
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(true);

  const onChangeTitle = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: string) => {
    setContent(e);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const slugValue = _.kebabCase(title);

    const data: IPost = {
      content: content,
      createdAt: serverTimestamp(),
      heartCount: 0,
      published: published,
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
    setLoading(false);
  };

  return (
    <div>
      <EditScreen
        loading={loading}
        title={title}
        content={content}
        handleSubmit={handleSubmit}
        onChangeTitle={onChangeTitle}
        setContent={setContent}
        published={published}
        setPublished={setPublished}
      />
    </div>
  );
}

export default NewPost;
