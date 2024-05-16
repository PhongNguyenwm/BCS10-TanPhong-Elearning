import React, { useContext, useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { coursesManagementServ } from "../../services/coursesManagement";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { Pagination, Rate } from "antd";
import Loading from "../../components/Loading/Loading";
import useLoading from "../../hooks/useLoading";

const FindCourse = () => {
  const notify = useContext(NotifyContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const coursename = searchParams.get("tenKhoaHoc");
  const [courses, setCourses] = useState([]);
  const coursesLength = courses.length;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const { isLoading, turnOnLoading, turnOffLoading } = useLoading();

  useEffect(() => {
    const fetchCoures = async () => {
      turnOnLoading();
      try {
        const res = await coursesManagementServ.findCourseList(coursename);
        setCourses(res.data);
        turnOffLoading();
      } catch (err) {
        notify(err.response.data);
      }
    };
    fetchCoures();
  }, [coursename]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentCourses = courses.slice(startIndex, startIndex + pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <Header />
      <div className="mt-32 container w-4/5">
        <h1 className="text-3xl font-bold">
          Tìm thấy {coursesLength} khoá học {coursename}
        </h1>
        {currentCourses.map((course) => {
          return (
            <div key={course.maKhoaHoc}>
              <br />
              <hr></hr>
              <div className="flex flex-col lg:flex-row mt-2 mb-5">
                <Link
                  to={`/detail/${course.maKhoaHoc}`}
                  className="flex w-full lg:w-1/3 mr-0 lg:mr-5 mb-5 lg:mb-0"
                >
                  <img src={course.hinhAnh} className="w-full"></img>
                </Link>
                <div className="flex-row w-full">
                  <h3 className="text-lg font-semibold mb-3">
                    {course.tenKhoaHoc}
                  </h3>
                  <p className="text-base ">Nội dung: {course.moTa}</p>
                  <div className="inline-flex my-3">
                    <Rate allowHalf defaultValue={4.5} disabled />
                    <p className="mx-3">4.5</p>
                    <p>({course.luotXem})</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          style={{ display: "flex", justifyContent: "start" }}
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

export default FindCourse;
