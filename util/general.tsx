import Router from "next/router";
import { IPost } from "../typings/interfaces";

export const getDayAndDate = (date: Date) => {
  const day = date.toLocaleString("en-us", { weekday: "long" });
  const month = date.toLocaleString("en-us", { month: "long" });
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return { day, dayNumber, month, year };
};

export const handleEdit = (post: IPost) => {
  // const { slug, username } = props;
  console.log(post);
  Router.push(`/edit/${post.username}/${post.slug}`);
};

export const handleUpdate = (e) => {};
