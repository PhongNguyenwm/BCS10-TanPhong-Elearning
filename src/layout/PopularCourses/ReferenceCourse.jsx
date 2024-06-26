import React, { useContext, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import ToolTip from "../../components/ToolTip/ToolTip";
import "./ReferenceCourse.scss";
import { coursesManagementServ } from "../../services/coursesManagement";
import avatarCard from "../../assets/img/emoji.6d1b7051.png";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";

export default function ReferenceCourse() {
  const notify = useContext(NotifyContext);
  const [getCourse, setGetCoure] = useState([]);
  const [arrow] = useState("Show");
  const [tooltipPosition, setTooltipPosition] = useState("right");

  useEffect(() => {
    coursesManagementServ
      .getCourseList()
      .then((res) => {
        setGetCoure(res.data);
      })
      .catch((err) => {
        notify(err.response.data);
      });
  }, []);

  useEffect(() => {
    const positions = getCourse.slice(3, 7).map((item, index) => {
      return index % 2 === 0 ? "right" : "left";
    });
    setTooltipPosition(positions);
  }, [getCourse]);

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, []);

  return (
    <div className="">
      <div className="course_content">
        <h3 className="text-lg">Khóa Học Tham Khảo</h3>
      </div>
      <div className="  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4   mb-5 gap-5 ">
        {getCourse.slice(6, 10).map((item, index) => {
          return (
            <ToolTip
              key={item.maKhoaHoc}
              placement={tooltipPosition[index]}
              arrow={mergedArrow}
              overlayClassName={`custom-tooltip ${
                index === 1 ? "custom-tooltip-second" : ""
              } ${
                index === 3 ? "custom-tooltip-fourth" : ""
              }  hide-on-small-screen`}
              title={
                <div className="custom-tooltip-content">
                  <div className="sub_card">
                    <div className="subCardHead">
                      <img src={avatarCard} alt="" />
                      <span className="ml-1 colorCardTitle">
                        Elun Musk Ricard
                      </span>
                    </div>
                    <h6 className="font-semibold">
                      BOOTCAMP - LẬP TRÌNH FULL STACK TỪ ZERO ĐẾN CÓ VIỆC
                    </h6>
                    <p className="colorCardTitle">
                      Đã có hơn 6200 bạn đăng kí học và có việc làm thông qua
                      chương trình đào tạo Bootcamp Lập trình Front End chuyên
                      nghiệp. Khóa học 100% thực hành cường độ cao theo dự án
                      thực tế và kết nối doanh nghiệp hỗ trợ tìm việc ngay sau
                      khi học...
                    </p>
                    <div className="cart_icon">
                      <span className="cart_icon1">
                        <i className="far fa-clock iconOclock"></i>8 giờ
                      </span>
                      <span className="cart_icon2">
                        <i className="far fa-calendar-alt iconCalendar"></i>4
                        tuần
                      </span>
                      <span className="cart_icon3">
                        <i className="fas fa-signal iconLevel"></i>Tất cả
                      </span>
                    </div>
                    <NavLink
                      to={`/detail/${item.maKhoaHoc}`}
                      key={item.maKhoaHoc}
                      className="btn_cart "
                    >
                      Xem Chi Tiết
                    </NavLink>
                  </div>
                </div>
              }
              item={item}
            />
          );
        })}
      </div>
    </div>
  );
}
