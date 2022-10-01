import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import {
  db,
  getUserFromUsername,
  PostToJSON,
  UserToJSON,
} from "../../../util/firebase";
import { IPost } from "../../../typings/interfaces";
import EditScreen from "../../../components/EditScreen";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
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

    post = (await getDocs(postQ)).docs.map((po) => {
      return PostToJSON(po);
    });
  }

  return { props: { user, post } };
};
interface ISlugProps {
  post: IPost[];
}

const EditPost = (props: ISlugProps) => {
  const { post } = props;

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(post[0].content);
  const [title, setTitle] = useState(post[0].title);
  const [published, setPublished] = useState(post[0].published);

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const slug = post[0].slug;
    const postRef = doc(db, "users", post[0].uid, "posts", slug);

    await updateDoc(postRef, {
      content: content,
      title: title,
      updatedAt: serverTimestamp(),
      published: published,
    });
    Router.push(`/${post[0].username}/${slug}`);
    setLoading(false);
  };

  const onChangeTitle = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <EditScreen
        loading={loading}
        handleSubmit={handleUpdate}
        content={content}
        title={title}
        onChangeTitle={onChangeTitle}
        setContent={setContent}
        published={published}
        setPublished={setPublished}
      />
    </div>
  );
};

export default EditPost;
