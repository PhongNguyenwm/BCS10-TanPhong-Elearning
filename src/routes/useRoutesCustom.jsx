import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SignIn from "../pages/SignIn/SignIn";
import UserTemplate from "../template/UserTemplate/UserTemplate";
const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemplate />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustom;
