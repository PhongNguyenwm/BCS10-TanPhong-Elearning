import React from "react";
import "./TeachingReview.scss";
import avatarReview from "../../assets/img/avatarReview.png";

export default function TeachingReview() {
  return (
    <div className="review">
      <div className="review_student">
        <div className="triangleTopRight"></div>
        <div className="smallBox smallboxLeftTop"></div>
        <div className="smallBox smallboxRightBottom"></div>
        <div class="smallBox smallboxRightTop"></div>
        <div class="smallBox smallboxLeftBottom"></div>
        <div className=" teaching_content grid grid-cols-12">
          <div className="col-span-6">
            <div className="review_image">
              <div className="bg_image">
                <img src={avatarReview} alt="" />
              </div>
            </div>
          </div>
          <div className="col-span-6 text_review">
            <blockquote className="textQoute ">
              <q>
                Chương trình giảng dạy được biên soạn dành riêng cho các bạn Lập
                trình từ trái ngành hoặc đã có kiến thức theo cường độ cao, luôn
                được tinh chỉnh và tối ưu hóa theo thời gian bởi các thành viên
                sáng lập và giảng viên dày kinh nghiệm.Thực sự rất hay và hấp
                dẫn
              </q>
            </blockquote>
            <p>Phong Dev</p>
            <div  className="studentGood">
            <span>Học viên xuất sắc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
