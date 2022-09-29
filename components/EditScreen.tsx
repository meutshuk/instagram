import dynamic from "next/dynamic";
import React, { useState } from "react";
import styles from "../styles/NewPost.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Switch } from "@nextui-org/react";
import Loader from "./Loader";

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

interface IEditScreenProps {
  handleSubmit: (e: { preventDefault: () => void }) => void;
  onChangeTitle: (e: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  title?: string;
  content?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  published: boolean;
  setPublished: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

function EditScreen(props: IEditScreenProps) {
  const {
    handleSubmit,
    title,
    onChangeTitle,
    content,
    setContent,
    published,
    setPublished,
    loading,
  } = props;

  const [preview, setPreview] = useState(false);
  //   const [loading, setLoading] = useState(false);
  //   const [published, setPublished] = useState(false);

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <input
            className={styles.title__input}
            value={title}
            onChange={onChangeTitle}
            type="text"
            placeholder="Enter title name here"
          />
          <div
            className={styles.switch__button}
            style={{ backgroundColor: preview ? "#e1e506" : "#2b80f0" }}
            onClick={() => {
              setPreview(!preview);
            }}
          >
            <div style={{ marginRight: "10px" }}>
              {preview ? "Edit" : "Preview"}
            </div>
            {preview ? <AiOutlineEdit /> : <GrView />}
          </div>
        </div>
        <div>
          {preview ? (
            <EditerMarkdown className="asdf" source={content} />
          ) : (
            <MarkdownEditor
              value={content}
              onChange={(v) => setContent(v)}
              height={"500px"}
              width={"90vw"}
            />
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles["publish-toggle"]}>
          <div className={styles.toggle__text}>Publish the document? </div>
          <Switch
            bordered
            checked={published}
            onChange={() => setPublished(!published)}
            size="lg"
            color="primary"
          />
        </div>
        <div>
          <button className={styles.submit__button} type={"submit"}>
            <div className={styles.submit__button__text}>Submit</div>
            {loading && <Loader />}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditScreen;
