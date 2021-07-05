import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { action, types } from "../state";
import useAppState from "./useAppState";

const saveNotificationToLocalStorage = (data) => {
  const notificationsRaw = window.localStorage.getItem("notifications");
  let notifications = [];
  if (notificationsRaw) {
    notifications = JSON.parse(notificationsRaw);
  }
  notifications.push(data);
  window.localStorage.setItem("notifications", JSON.stringify(notifications));
};

function useNotifications() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { state, dispatch } = useAppState();
  const loggedIn = state?.auth?.loggedIn;
  const userName = state?.user?.details?.userName;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loggedIn && userName)
      setSocket(
        io(process.env.REACT_APP_SOCKET_URL ?? "http://localhost:5000")
      );
  }, [loggedIn, userName]);

  useEffect(() => {
    if (socket && !connected) {
      socket.on("connect", () => {
        setConnected(true);
        socket.volatile.emit("join", { userName });
      });
    }
    // eslint-disable-next-line
  }, [socket, connected]);

  useEffect(() => {
    if (socket) {
      socket.on("disconnect", () => {
        setConnected(false);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        dispatch(action(types.NOTIFICATION_RECEIVED, data));
        enqueueSnackbar(data.message, { variant: "success" });
        saveNotificationToLocalStorage(data);
      });
    }
    // eslint-disable-next-line
  }, [socket]);
  return null;
}

export default useNotifications;
