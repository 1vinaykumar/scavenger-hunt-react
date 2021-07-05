import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { action, types } from "../state";
import useAPI from "../utils/useAPI";
import useAppState from "../utils/useAppState";
import NotificationTop from "./NotificationTop";

const NavItem = ({ name, path }) => {
  return (
    <li className="nav-item px-md-5 mx-auto">
      <NavLink className="nav-link" to={path}>
        {name}
      </NavLink>
    </li>
  );
};

function MainNav() {
  const [show, setShow] = useState("");
  const { state, dispatch } = useAppState();
  const { logout, getUser } = useAPI();
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("loginToken");
    const role = window.localStorage.getItem("role");

    if (state?.auth?.loggedIn || (token && role)) {
      dispatch(action(types.LOGIN_SUCCESS, { token, role }));
      getUser();
      history.push(role === "USER" ? "/user" : "/admin");
    }
    const notifications =
      JSON.parse(window.localStorage.getItem("notifications")) ?? [];
    notifications.forEach((item) => {
      dispatch(action(types.NOTIFICATION_RECEIVED, item));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          Scavenger Hunt
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow((prev) => (prev === "" ? "show" : ""))}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${show}`}>
          <ul className="navbar-nav">
            {state?.auth?.loggedIn ? (
              <>
                <NavItem
                  name="Home"
                  path={`/${state?.auth?.role === "ADMIN" ? "admin" : "user"}`}
                />

                <li className="nav-item px-md-5 mx-auto">
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <NavItem name="Home" path="/" />
                <NavItem name="Login" path="/login" />
              </>
            )}
            <li className="nav-item mx-auto">
              <NotificationTop
                count={state?.notifications?.list?.length ?? 0}
                clickHandler={() => history.push("/notifications")}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
