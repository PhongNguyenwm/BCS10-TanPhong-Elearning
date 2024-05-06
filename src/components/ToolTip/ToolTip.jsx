import React from "react";
import { Tooltip } from "antd";

import avartarImage from "../../assets/img/avatar2.bb9626e2.png";
export default function ToolTip({
  placement,
  arrow,
  overlayClassName,
  title,
  item,
}) {
  return (
    <div className="course_item grid col-span-3">
      <Tooltip
        placement={placement}
        arrow={arrow}
        overlayClassName={overlayClassName}
        title={title}
      >
        <div className="cart-top">
          {/* Your cart content */}
          <div className="cart">
            <img className="img_course" src={item.hinhAnh} />
            <p className="name_course">{item.tenKhoaHoc}</p>
            <p className="line-clamp-1 mt-5 px-5 mb-2 font-medium">
              {item.moTa}
            </p>
            <div className="cart_icon">
              <span className="cart_icon1">
                <i className="far fa-clock iconOclock"></i>8 giờ
              </span>
              <span className="cart_icon2">
                <i className="far fa-calendar-alt iconCalendar"></i>4 tuần
              </span>
              <span className="cart_icon3">
                <i className="fas fa-signal iconLevel"></i>Tất cả
              </span>
            </div>
            <hr className="mt-5" />
            <div className="referencecourse_item">
              <div className="title_maker">
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
              <div>
                <p className="p_footer1">
                  800.000<sup>đ</sup>
                </p>
                <p className="p_footer2 font-semibold">
                  400.000<sup>đ</sup>
                  <i className="fas fa-tag iconTag"></i>
                </p>
              </div>
            </div>
            <div className="card-sale">
            <span>Yêu Thích</span>
          </div>
          </div>
          
        </div>
      </Tooltip>
    </div>
  );
}
