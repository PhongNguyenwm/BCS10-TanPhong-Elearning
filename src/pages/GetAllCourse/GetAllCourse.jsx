import React, { useContext, useEffect, useState } from "react";
import Header from "../../layout/Header/Header";
import { Pagination } from "antd";
import { coursesManagementServ } from "../../services/coursesManagement";
import { NavLink } from "react-router-dom";
import avartarImage from "../../assets/img/avatar2.bb9626e2.png";
import "./GetAllCourse.scss";
import useLoading from "../../hooks/useLoading";
import Loading from "../../components/Loading/Loading";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";

export default function GetAllCourse() {
  const [getCourse, setGetCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const { isLoading, turnOnLoading, turnOffLoading } = useLoading();
  const notify = useContext(NotifyContext);

  useEffect(() => {
    turnOnLoading();
    coursesManagementServ
      .getCourseList()
      .then((res) => {
        setGetCourse(res.data);
        turnOffLoading();
      })
      .catch((err) => {
        notify(err.response.data);
        turnOffLoading();
      });
  }, [turnOnLoading, turnOffLoading]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentCourses = getCourse.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div>
        {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        <div className="  titleDetail1 text-xl px-12 py-12">
          <h3 className="text-black text-3xl font-bold">Khóa học</h3>
          <p className="text-black">Bắt Đầu Hành Trình Nào!!!</p>
        </div>
        <div className=" container allCourse pt-">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-5 ">
            <div className="">
              <div className="courseBox bgStyle1">
                <h6>Chương Trình Học</h6>
                <i className="fas fa-laptop text-3xl"></i>
                <p className="text-xl">300</p>
              </div>
            </div>
            <div className="">
              <div className="courseBox bgStyle2">
                <h6>Nhà Sáng Tạo</h6>
                <i className="fas fa-camera text-3xl"></i>
                <p className="text-xl">10000</p>
              </div>
            </div>
            <div className="">
              <div className="courseBox bgStyle3">
                <h6>Nhà Thiết Kế</h6>
                <i className="fas fa-briefcase text-3xl"></i>
                <p className="text-xl">400</p>
              </div>
            </div>
            <div className="">
              <div className="courseBox bgStyle4">
                <h6>Bài Giảng</h6>
                <i className="fas fa-book text-3xl"></i>
                <p className="text-xl">3000</p>
              </div>
            </div>
            <div className="">
              <div className="courseBox bgStyle5">
                <h6>Video</h6>
                <i className="fas fa-play-circle text-3xl"></i>
                <p className="text-xl">4000</p>
              </div>
            </div>
            <div className="">
              <div className="courseBox bgStyle6">
                <h6>Lĩnh Vực</h6>
                <i className="fas fa-dice-d20 text-3xl"></i>
                <p className="text-xl">200</p>
              </div>
            </div>
          </div>
        </div>
        <div className="courseListPage text-xl px-12 py-12">
          <h6 className="font-semibold">
            <i className="fas fa-bookmark pr-2 icon_content" />
            Danh sách khóa học
          </h6>
          <div>
            <div className="course">
              <div className="course_content"></div>
              <div className=" container grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  lg:grid-cols-3 mb-5 gap-5">
                {currentCourses.map((item) => (
                  <NavLink
                    to={`/detail/${item.maKhoaHoc}`}
                    key={item.maKhoaHoc}
                    className="course_item courseItem1  "
                  >
                    <div className="cart_header">
                      <div></div>
                      <img
                        className="img_course"
                        src={item.hinhAnh}
                        alt={item.tenKhoaHoc}
                      />
                      <p className="name_course">{item.tenKhoaHoc}</p>
                      <p className="line-clamp-1 mt-5 px-5 mb-2 font-medium">
                        {item.moTa}
                      </p>
                      <div className="title_maker px-4">
                        <div>
                          <img
                            className="img_card_course mr-2"
                            src={avartarImage}
                            alt=""
                          />
                        </div>
                        <div className="text_name">
                          <span>Elon Musk</span>
                        </div>
                      </div>
                      <hr className="mt-5" />
                      <div className="cart_footer">
                        <div>
                          <p className="p_footer1">
                            800.000
                            <sup>đ</sup>
                          </p>
                          <p className="p_footer2 font-semibold">
                            400.000
                            <sup>đ</sup>
                          </p>
                        </div>
                        <div>
                          <i className="fas fa-star mr-1 textStar"></i>
                          <span className="textStar">4.9</span>
                          <span className="text_number">(7840)</span>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
              <Pagination
                style={{ display: "flex", justifyContent: "center" }}
                className="my-10"
                current={currentPage}
                total={getCourse.length}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
