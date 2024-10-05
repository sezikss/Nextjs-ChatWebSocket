import React from "react";
import { FaRocketchat } from "react-icons/fa";
import s from "./Chats.module.scss";
const Chats = () => {
  return (
    <div className={s.chat}>
      <div className={s.chatTitle}>
        <h1>Conection...</h1>
      </div>
      <div className={s.group}>
        <div className={s.motionwebImg}>
          <img
            src="https://motion.kg/_next/static/media/motionweb-logo.922a0cc5.svg"
            alt="motion Web"
          />
        </div>
        <div className={s.groupTitle}>
          <h2>Senior Pro-6</h2>
        </div>
      </div>
    </div>
  );
};
export default Chats;