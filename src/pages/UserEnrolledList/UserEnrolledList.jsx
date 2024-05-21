import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { Pagination, Rate, Button, Input } from "antd";
import { userManagementServ } from "../../services/userManagement";
import { coursesManagementServ } from "../../services/coursesManagement";
import useResponsive from "../../hooks/useResponsive";
const { Search } = Input;

const UserEnrolledList = () => {
  const notify = useContext(NotifyContext);
  const [coursesEnrolled, setCoursesEnrolled] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 5;
  const { taiKhoan } = useParams();
  const { isDesktop, isTablet, isMobile } = useResponsive();

  useEffect(() => {
    const fetchCouresEnrolled = async () => {
      try {
        const res = await userManagementServ.getUserEnrolledCourses();
        setCoursesEnrolled(res.data.chiTietKhoaHocGhiDanh);
      } catch (err) {
        notify(err.response.data);
      }
    };
    fetchCouresEnrolled();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUnEnroll = async (courseCode) => {
    try {
      await coursesManagementServ.deletedEnroll(courseCode, taiKhoan);
      const updateCourses = coursesEnrolled.filter(
        (course) => course.maKhoaHoc !== courseCode
      );
      setCoursesEnrolled(updateCourses);
      notify("Hủy ghi danh thành công");
    } catch (err) {
      notify(err.response.data);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
    setCurrentPage(1);
  };
  const filterCourses = coursesEnrolled.filter((course) =>
    course.tenKhoaHoc.toLowerCase().includes(searchQuery)
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentCourses = filterCourses.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      {isDesktop && (
        <div className="mt-5 container w-full">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Các khoá học đã tham gia</h1>
            <Search
              placeholder="Tìm kiếm khoá học"
              onSearch={handleSearch}
              className=" w-1/2"
              size="large"
              allowClear="true"
            />
          </div>
          {currentCourses.map((course) => {
            return (
              <div key={course.maKhoaHoc}>
                <br />
                <hr></hr>
                <div className="flex mt-2 mb-5">
                  <div className="flex w-1/2 mr-5">
                    <img src={course.hinhAnh} className="w-full h-60"></img>
                  </div>
                  <div className="flex-row w-full">
                    <h3 className="text-lg font-semibold mb-3">
                      {course.tenKhoaHoc}
                    </h3>
                    <p className="text-base line-clamp-5 ">
                      Nội dung: {course.moTa}
                    </p>
                    <div className="inline-flex my-3">
                      <Rate allowHalf defaultValue={4.5} disabled />
                      <p className="mx-3">4.5</p>
                      <p>({course.luotXem})</p>
                    </div>
                    <div>
                      <Button
                        className="hover: bg-red-600"
                        type="primary"
                        danger
                        onClick={() => handleUnEnroll(course.maKhoaHoc)}
                      >
                        Huỷ ghi danh
                      </Button>
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
            total={filterCourses.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}
      {isTablet && (
        <div className="mt-5 container w-11/12">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-3">
              Các khoá học đã tham gia
            </h1>
            <Search
              placeholder="Tìm kiếm khoá học"
              onSearch={handleSearch}
              className=" w-full"
              size="large"
              allowClear="true"
            />
          </div>
          {currentCourses.map((course) => {
            return (
              <div key={course.maKhoaHoc}>
                <br />
                <hr></hr>
                <div className="flex flex-row mt-2 mb-5">
                  <div className="flex w-1/2 mr-5">
                    <img src={course.hinhAnh} className="w-full h-60"></img>
                  </div>
                  <div className="flex-row w-1/2">
                    <h3 className="text-lg font-semibold mb-3">
                      {course.tenKhoaHoc}
                    </h3>
                    <p className="text-base line-clamp-4 ">
                      Nội dung: {course.moTa}
                    </p>
                    <div className="inline-flex my-3">
                      <Rate allowHalf defaultValue={4.5} disabled />
                      <p className="mx-3">4.5</p>
                      <p>({course.luotXem})</p>
                    </div>
                    <div>
                      <Button
                        className="hover: bg-red-600"
                        type="primary"
                        danger
                        onClick={() => handleUnEnroll(course.maKhoaHoc)}
                      >
                        Huỷ ghi danh
                      </Button>
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
            total={filterCourses.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}
      {isMobile && (
        <div className="mt-5 container w-11/12">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-3">
              Các khoá học đã tham gia
            </h1>
            <Search
              placeholder="Tìm kiếm khoá học"
              onSearch={handleSearch}
              className=" w-full"
              size="large"
              allowClear="true"
            />
          </div>
          {currentCourses.map((course) => {
            return (
              <div key={course.maKhoaHoc}>
                <br />
                <hr></hr>
                <div className="flex flex-col mt-2 mb-5">
                  <div className="flex w-full mr-5">
                    <img
                      src={course.hinhAnh}
                      className="w-full h-60 mb-2"
                    ></img>
                  </div>
                  <div className="flex-row w-full">
                    <h3 className="text-lg font-semibold mb-3">
                      {course.tenKhoaHoc}
                    </h3>
                    <p className="text-base text-left ">
                      Nội dung: {course.moTa}
                    </p>
                    <div className="inline-flex my-3">
                      <Rate allowHalf defaultValue={4.5} disabled />
                      <p className="mx-3">4.5</p>
                      <p>({course.luotXem})</p>
                    </div>
                    <div>
                      <Button
                        className="hover: bg-red-600"
                        type="primary"
                        danger
                        onClick={() => handleUnEnroll(course.maKhoaHoc)}
                      >
                        Huỷ ghi danh
                      </Button>
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
            total={filterCourses.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserEnrolledList;
