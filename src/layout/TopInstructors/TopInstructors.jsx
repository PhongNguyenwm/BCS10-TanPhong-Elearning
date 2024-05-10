import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "./TopInstructors.scss";
import instructor1 from "../../assets/img/instrutor1.jpg";
import instructor2 from "../../assets/img/instrutor2.jpg";
import instructor3 from "../../assets/img/instrutor3.jpg";
import instructor4 from "../../assets/img/instrutor4.jpg";
import instructor5 from "../../assets/img/instrutor5.jpg";
import instructor6 from "../../assets/img/instrutor6.jpg";
import instructor7 from "../../assets/img/instrutor7.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function TopInstructors() {
  const settings = {
    rows: 1,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Hiển thị 2 phần tử cùng một lúc
    slidesToScroll: 4, // Cuộn 2 phần tử khi nhấp vào nút điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <div className="TopInstructors mt-10 ">
        <h6 className="instructors_header font-semibold ml-5 mb-10">
          <NavLink>Giảng Viên Hàng Đầu</NavLink>
        </h6>
        <div className="slider-wrapper">
          <Slider  {...settings}>
            <div className="grid col-span-1 intructors_hover center-item ">
              <div className="intructors_content">
                <img src={instructor2} alt="Instructor 2" />
                <h6 className="pb-2 font-semibold">Big DadMoon</h6>
                <div className="intructors_text">
                  <p>Chuyên Gia Lĩnh Vực</p>
                  <p>Lập Trình</p>
                  <p className="reviewMentor">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="text_start">4.9</span>
                  </p>
                  <span className="textReviewBot">100 Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 intructors_hover ">
              <div className="intructors_content">
                <img src={instructor1} alt="Instructor 1" />
                <h6 className="pb-2 font-semibold">Big DadMoon</h6>
                <div className="intructors_text">
                  <p>Chuyên Gia Ngôn Ngữ</p>
                  <p>Vue Js</p>
                  <p className="reviewMentor">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="text_start">4.9</span>
                  </p>
                  <span className="textReviewBot">100 Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 intructors_hover">
              <div className="intructors_content">
                <img src={instructor3} alt="Instructor 3" />
                <h6 className="pb-2 font-semibold">Bladin Slaham</h6>
                <div className="intructors_text">
                  <p>Chuyên gia hệ thống</p>
                  <p>Máy Tính</p>
                  <p className="reviewMentor">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="text_start">4.9</span>
                  </p>
                  <span className="textReviewBot">100 Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 intructors_hover">
              <div className="intructors_content">
                <img src={instructor4} alt="Instructor 4" />
                <h6 className="pb-2 font-semibold">Chris Andersan</h6>
                <div className="intructors_text">
                  <p>Chuyên Gia Lĩnh Vực</p>
                  <p>Full Skill</p>
                  <p className="reviewMentor">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="text_start">4.9</span>
                  </p>
                  <span className="textReviewBot">100 Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 intructors_hover">
              <div className="intructors_content">
                <img src={instructor5} alt="Instructor 5" />
                <h6 className="pb-2 font-semibold">VueLo Gadi</h6>
                <div className="intructors_text">
                  <p>Chuyên Gia Lĩnh Vực</p>
                  <p>Phân Tích</p>
                  <p className="reviewMentor">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="text_start">4.9</span>
                  </p>
                  <span className="textReviewBot">100 Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 intructors_hover">
              <div className="intructors_content">
                <img src={instructor6} alt="Instructor 6" />
                <h6 className="pb-2 font-semibold">Hoàng Nam</h6>
                <div className="intructors_text">
                  <p>Chuyên Gia Lĩnh Vực</p>
                  <p>PHP</p>
                  <p className="reviewMentor">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="text_start">4.9</span>
                  </p>
                  <span className="textReviewBot">100 Đánh giá</span>
                </div>
              </div>
            </div>
            <div className="grid col-span-1 intructors_hover">
              <div className="intructors_content">
                <img src={instructor7} alt="Instructor 6" />
                <h6 className="pb-2 font-semibold">David Ngô Savani</h6>
                <div className="intructors_text">
                  <p>Chuyên Gia Lĩnh Vực</p>
                  <p>Front End</p>
                  <p className="reviewMentor">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="text_start">4.9</span>
                  </p>
                  <span className="textReviewBot">100 Đánh giá</span>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
