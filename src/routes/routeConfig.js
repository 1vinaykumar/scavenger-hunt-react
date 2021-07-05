import Forbidden from "../pages/Forbidden";
import AdminHome from "../pages/AdminHome";
import Home from "../pages/Home";
import Login from "../pages/Login";
import UserHome from "../pages/UserHome";
import Notifications from "../pages/Notifications";

const routeConfig = [
  {
    id: "home",
    path: "/",
    private: false,
    roles: [],
    component: Home,
  },
  {
    id: "forbidden",
    path: "/forbidden",
    private: false,
    roles: [],
    component: Forbidden,
  },
  {
    id: "login",
    path: "/login",
    private: false,
    roles: [],
    component: Login,
  },
  {
    id: "user",
    path: "/user",
    private: true,
    roles: ["USER", "ADMIN"],
    component: UserHome,
  },
  {
    id: "admin",
    path: "/admin",
    private: true,
    roles: ["ADMIN"],
    component: AdminHome,
  },
  {
    id: "notifications",
    path: "/notifications",
    private: true,
    roles: ["ADMIN", "USER"],
    component: Notifications,
  },
];

export default routeConfig;
