import React from "react";
import { IButtonProps } from "../typings/interfaces";

function Button(props: IButtonProps) {
  const { text, handleClick, width, height, bgColor, color, borderRadius } =
    props;

  const style = {
    button: {
      backgroundColor: bgColor || "red",
      color: color || "black",
      padding: "10px 20px",
      borderRadius: borderRadius || 0,
      height: height,
      width: width,
      border: "none",
      cursor: "pointer",
      outline: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={style.button} onClick={handleClick}>
      <div>{text}</div>
    </div>
  );
}

export default Button;
