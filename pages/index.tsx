import type { GetServerSideProps, NextPage } from "next";
import { useContext, useState } from "react";
import { UserContext } from "../util/context";

import { db, getProfileUrl, PostToJSON } from "../util/firebase";
import {
  collectionGroup,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { IPost } from "../typings/interfaces";
import PostFeed from "../components/PostFeed";

export const getServerSideProps: GetServerSideProps = async (context) => {
  await getProfileUrl("utshuk");

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
  const { user, username } = useContext(UserContext);

  return (
    <div className="main-container">
      <PostFeed posts={post} />
    </div>
  );

  return <div>Home</div>;
};

export default Home;
