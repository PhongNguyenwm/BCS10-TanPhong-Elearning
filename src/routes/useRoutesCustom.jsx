import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import CourseManagement from "../pages/CourseManagement/CourseManagement";
import AddCourse from "../pages/AddCourse/AddCourse";
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
        {
          path: "sign-up",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminTemplate />,
      children: [
        {
          path: "quan-li-khoa-hoc",
          element: <CourseManagement />,
        },
        {
          element: <CourseManagement />,
          index: true,
        },
        {
          path: "them-khoa-hoc",
          element: <AddCourse />,
        },
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustom;
