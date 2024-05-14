import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./PopularCourses.scss";
import { coursesManagementServ } from "../../services/coursesManagement";
import avartarImage from "../../assets/img/avatar2.bb9626e2.png";
import ReferenceCourse from "./ReferenceCourse";
import FrontendReactCourse from "./FrontendReactCourse";

export default function PopularCourses() {
  const [getCourse, setGetCourse] = useState([]);

  useEffect(() => {
    coursesManagementServ
      .getCourseList()
      .then((res) => {
        setGetCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="course">
      <div className="course_content">
        <h3>Khóa Học Phổ Biến</h3>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-10">
        {getCourse.slice(3, 7).map((item, index) => (
          <NavLink
            to={`/detail/${item.maKhoaHoc}`}
            key={item.maKhoaHoc}
            className="course_item col-span-3 sm:col-span-6 md:col-span-6 lg:col-span-3"
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
      <ReferenceCourse />
      <div className="mt-10">
        <FrontendReactCourse />
      </div>
    </div>
  );
}
