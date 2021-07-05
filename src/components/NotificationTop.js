import React from "react";
import { ReactComponent as NotificationIcon } from "../assets/notification.svg";
import useNotifications from "../utils/useNotifications";

function NotificationTop({ count, clickHandler }) {
  useNotifications();
  return (
    <button className="btn position-relative" onClick={clickHandler}>
      <NotificationIcon />
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {count ?? "0"}
        <span className="visually-hidden">Unread Notifications</span>
      </span>
    </button>
  );
}

export default NotificationTop;
