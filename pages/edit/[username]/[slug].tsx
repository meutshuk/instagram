import React, { useState } from "react";
import dynamic from "next/dynamic";

// import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { GetServerSideProps } from "next";
import {
  db,
  getUserFromUsername,
  PostToJSON,
  UserToJSON,
} from "../../../util/firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IPost, IUser } from "../../../typings/interfaces";

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

    post = (await getDocs(postQ)).docs.map((po) => {
      return PostToJSON(po);
    });
  }

  return { props: { user, post } };
};

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

interface ISlugProps {
  user: IUser;
  post: IPost[];
}

const EditPost = (props: ISlugProps) => {
  const { user, post } = props;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(post[0].content);
  const [title, setTitle] = useState(post[0].title);
  const [preview, setPreview] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const slug = post[0].slug;
    const postRef = doc(db, "users", post[0].uid, "posts", slug);

    await updateDoc(postRef, {
      content: content,
      title: title,
    });
    setLoading(false);
  };

  return (
    <div>
      <p>Change title</p>
      <input
        type="text"
        value={title}
        onChange={(v) => {
          setTitle(v.target.value);
        }}
      />
      <br />
      <br />
      <p>Change content</p>
      <div>
        <button
          onClick={() => {
            setPreview(!preview);
          }}
        >
          {preview ? "Edit" : "Preview"}
        </button>
        {/* <button>Preview</button> */}
      </div>
      {preview ? (
        <EditerMarkdown className="asdf" source={content} />
      ) : (
        <MarkdownEditor
          //   theme={"light"}

          value={content}
          onChange={(v) => setContent(v)}
          height={"300px"}
          enableScroll={true}
        />
      )}

      <button
        disabled={loading}
        onClick={() => {
          handleUpdate();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditPost;
