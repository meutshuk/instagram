import React from "react";
import Image from "next/image";
import style from "../styles/ProfileArea.module.scss";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { RiCake2Fill } from "react-icons/ri";
import { getDayAndDate } from "../util/general";

function ProfileArea(props) {
  const { user } = props;
  const [mouseOverGoogle, setMouseOverGoogle] = React.useState(false);

  const date = new Date(user.createdAt);
  const { day, dayNumber, month, year } = getDayAndDate(date);

  return (
    <div className={style.profileArea__container}>
      <div className={style.profilePicture__container}>
        <Image
          className={style.profileArea__picture}
          src={user.photoURL}
          alt="profile pic"
          layout="responsive"
          width="100%"
          height="100%"
        />
      </div>
      <h2>@{user.username}</h2>
      <h5>{user.displayName}</h5>
      <div>
        <p>
          <RiCake2Fill />
          <span>
            joined on {dayNumber} {month} {year}
          </span>
        </p>

        <p
          onMouseEnter={() => setMouseOverGoogle(true)}
          onMouseLeave={() => setMouseOverGoogle(false)}
        >
          {mouseOverGoogle ? <FcGoogle size={30} /> : <FaGoogle size={30} />}
        </p>
      </div>
    </div>
  );
}

export default ProfileArea;
