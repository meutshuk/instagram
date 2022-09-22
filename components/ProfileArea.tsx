import React from "react";
import Image from "next/image";

function ProfileArea(props) {
  const { user } = props;
  console.log("user", user);
  return (
    <div>
      <Image src={user.photoURL} alt="profile pic" height={200} width={200} />
      <h3>{user.displayName}</h3>
      <h4>{user.username}</h4>
    </div>
  );
}

export default ProfileArea;
