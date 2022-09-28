import Router from "next/router";

export const getDayAndDate = (date: Date) => {
  const day = date.toLocaleString("en-us", { weekday: "long" });
  const month = date.toLocaleString("en-us", { month: "long" });
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return { day, dayNumber, month, year };
};

export const handleEdit = (slug: string, username: string) => {
  // const { slug, username } = props;
  console.log("Edit");
  Router.push(`/edit/${username}/${slug}`);
};

export const handleUpdate = (e) => {};
