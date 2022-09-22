import React from "react";
import style from "../styles/Loader.module.scss";
import { ILoaderProps } from "../typings/interfaces";

export default function Loader(props: ILoaderProps) {
  const { show } = props;

  return show ? <div className={style.loader} /> : null;
}
