import React, { useState, useEffect, useContext } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { useLocation } from "react-router-dom";
import { coursesManagementServ } from "../../services/coursesManagement";
import { Pagination, Rate } from "antd";
import { getLocalStorage } from "../../utils/util";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import Loading from "../../components/Loading/Loading";
import useLoading from "../../hooks/useLoading";
import "./CourseCatalog.scss";
const CourseCatalog = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const maDanhMuc = params.get("MaDanhMuc");
  const CategoryName = params.get("categoryName");
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const userLocal = getLocalStorage("user");
  const notify = useContext(NotifyContext);
  const { isLoading, turnOnLoading, turnOffLoading } = useLoading();
  useEffect(() => {
    const fetchCoures = async () => {
      turnOnLoading();
      try {
        const res = await coursesManagementServ.getCoursesByCatalog(maDanhMuc);
        setCourses(res.data);
        turnOffLoading();
      } catch (err) {
        console.log(err);
      }
    };
    fetchCoures();
  }, [maDanhMuc, notify]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentCourses = courses.slice(startIndex, startIndex + pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRegisterCourse = async (courseCode) => {
    try {
      const enrollData = {
        maKhoaHoc: courseCode,
        taiKhoan: userLocal.taiKhoan,
      };
      const res = await coursesManagementServ.registerCourse(enrollData);
      notify("đăng ký thành công");
    } catch (err) {
      notify(err.response.data);
    }
  };

  return (
    <div>
      <Header className="mb-5" />
      <div className="mt-24">
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        <div className="titleDetail mb-5">
          <h3 className="text-3xl font-bold mb-2">{CategoryName}</h3>
        </div>
        <div
          className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-5 gap-10"
          style={{ width: "90%" }}
        >
          {currentCourses.map((course) => (
            <div
              key={course.maKhoaHoc}
              className="border rounded border-amber-400"
            >
              <img
                className="w-full h-64 rounded border border-amber-400"
                src={course.hinhAnh}
                alt="Hình ảnh khoá học"
              />
              <h4 className="mt-3 ml-5">{course.tenKhoaHoc}</h4>
              <div className="inline-flex my-3 ml-5">
                <Rate allowHalf defaultValue={4.5} disabled />
                <p className="mx-3">4.5</p>
                <p>(1,593)</p>
              </div>
              <div className="flex justify-end mr-1 mb-1">
                <button
                  onClick={() => handleRegisterCourse(course.maKhoaHoc)}
                  className=" text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-sans text-base rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 "
                >
                  Đăng ký
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          className="my-10"
          current={currentPage}
          total={courses.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CourseCatalog;
