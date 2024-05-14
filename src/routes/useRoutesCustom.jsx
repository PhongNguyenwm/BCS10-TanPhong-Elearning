import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/AdminTemplate/AdminTemplate";
import CourseManagement from "../pages/CourseManagement/CourseManagement";
import AddCourse from "../pages/AddCourse/AddCourse";
import EditCourse from "../pages/EditCourse/EditCourse";
import Detail from "../pages/Detail/Detail";
import UserManagerment from "../pages/UserManagement/UserManagement";
import AddUser from "../pages/UserManagement/AddUser/AddUser";
import EditUser from "../pages/UserManagement/EditUser/EditUser";
import EnrollCourse from "../pages/EnrollCourse/EnrollCourse";
import EnrollStudents from "../pages/UserManagement/EnrollStudents/EnrollStudents";
import CourseCatalog from "../pages/CourseCatalog/CourseCatalog";
import FindCourse from "../pages/FindCourse/FindCourse";
import InfomationUser from "../pages/InfomationUser/InfomationUser";
import BuidingPage from "../layout/BuidingPage/BuidingPage";
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
        {
          path: "detail/:maKhoaHoc",
          element: <Detail />,
        },
        {
          path: "DanhMucKhoaHoc",
          element: <CourseCatalog />,
        },
        {
          path: "TimKiemKhoaHoc",
          element: <FindCourse />,
        },
        {
          path: "Thongtintaikhoan/:taiKhoan/:maLoaiNguoiDung",
          element: <InfomationUser />,
        },
        {
          path: "TrangDangXayDung",
          element: <BuidingPage />,
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
        {
          path: "quan-li-khoa-hoc/sua-khoa-hoc/:maKhoaHoc",
          element: <EditCourse />,
        },
        {
          path: "quan-li-khoa-hoc/ghi-danh-khoa-hoc/:maKhoaHoc",
          element: <EnrollCourse />,
        },
        {
          path: "quan-li-nguoi-dung",
          element: <UserManagerment />,
        },
        {
          path: "quan-li-nguoi-dung/them-nguoi-dung",
          element: <AddUser />,
        },
        {
          path: "quan-li-nguoi-dung/sua-nguoi-dung/:taiKhoan",
          element: <EditUser />,
        },
        {
          path: "quan-li-nguoi-dung/ghi-danh-khoa-hoc/:taiKhoan",
          element: <EnrollStudents />,
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
          path: "quan-li-khoa-hoc/them-khoa-hoc",
          element: <AddCourse />,
        },
        {
          path: "quan-li-khoa-hoc/sua-khoa-hoc/:maKhoaHoc",
          element: <EditCourse />,
        },
        {
          path: "quan-li-khoa-hoc/ghi-danh-khoa-hoc/:maKhoaHoc",
          element: <EnrollCourse />,
        },
        {
          path: "quan-li-nguoi-dung",
          element: <UserManagerment />,
        },
        {
          path: "quan-li-nguoi-dung/them-nguoi-dung",
          element: <AddUser />,
        },
        {
          path: "quan-li-nguoi-dung/sua-nguoi-dung/:taiKhoan",
          element: <EditUser />,
        },
        {
          path: "quan-li-nguoi-dung/ghi-danh-khoa-hoc/:taiKhoan",
          element: <EnrollStudents />,
        },
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustom;
