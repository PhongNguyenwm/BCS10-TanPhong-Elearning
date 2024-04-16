import React from "react";
import "./BoxNumber.scss";
import imageBox from "../../assets/img/Studen1.png";
import lichNumber from "../../assets/img/LichNumber.png";
import dongHoCat from "../../assets/img/donghocat.png";
import teacher from "../../assets/img/teacherNumber.png";
import CountUp from "react-countup";
export default function BoxNumber() {
  return (
    <div className="boxNumber container ">
      <div className="boxNumber_content">
        <div className="grid grid-cols-12 justify-center items-center">
          <div className="grid col-span-3">
            <div className="boxNumber_item">
              <div>
                <img src={imageBox} alt="" />
              </div>
              <div className="text_number">
                <CountUp className="" end={9000} duration={5} />
               
                <p className="textNumberTitle font-semibold">Học viên</p>
              </div>
            </div>
          </div>
          <div className="grid col-span-3">
            <div className="boxNumber_item">
              <div>
                <img src={lichNumber} alt="" />
              </div>
              <div className="text_number">
              <CountUp className="span" end={1000} duration={5} />
                <p class="textNumberTitle font-semibold">Khóa học</p>
              </div>
            </div>
          </div>
          <div className="grid col-span-3">
            <div className="boxNumber_item">
              <div>
                <img src={dongHoCat} alt="" />
              </div>
              <div className="text_number">
              <CountUp className="span" end={33200} duration={5} />
                <p class="textNumberTitle font-semibold">Giờ Học</p>
              </div>
            </div>
          </div>
          <div className="grid col-span-3">
            <div className="boxNumber_item">
              <div>
                <img src={teacher} alt="" />
              </div>
              <div className="text_number">
              <CountUp className="span" end={400} duration={5} />
                <p class="textNumberTitle font-semibold">Giảng viên</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
