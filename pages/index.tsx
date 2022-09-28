import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { UserContext } from "../util/context";
import Button from "@mui/material/Button";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import {
  db,
  getPostsfromUsername,
  getPublishedPosts,
  getUserFromUsername,
  PostToJSON,
  UserToJSON,
} from "../util/firebase";
import {
  collection,
  collectionGroup,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import Posts from "./[username]/[slug]";
import { IPost } from "../typings/interfaces";
import PostFeed from "../components/PostFeed";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(postsss.docs.data());

  let user = null;
  let post = null;

  const postQ = query(
    collectionGroup(db, "posts"),
    where("published", "==", true),
    limit(10)
  );

  post = (await getDocs(postQ)).docs.map((po) => {
    return PostToJSON(po);
  });

  return { props: { post } };
};

interface ISlugProps {
  post: IPost[];
}

const Home = (props: ISlugProps) => {
  const [post, setPost] = useState(props.post);
  console.log(post);
  const { user, username } = useContext(UserContext);

  return (
    <div>
      <PostFeed posts={post} />
    </div>
  );

  return <div>Home</div>;
};

export default Home;
