import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import Ingredients from "./pages/Ingredients";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      component: Home,
    },
    {
      path: "/ingredients",
      component: Ingredients,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/profile",
      component: Profile,
    },
  ]);
}
