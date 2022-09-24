export const getDayAndDate = (date: Date) => {
  const day = date.toLocaleString("en-us", { weekday: "long" });
  const month = date.toLocaleString("en-us", { month: "long" });
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return { day, dayNumber, month, year };
};
