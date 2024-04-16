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

// thay đổi


// source này nhiều lỗi quá kakaka

// source em đang muốn làm là folderr nào, anh thấy nó đang bị lồng nhau đó cái boxNumber nè anh

// vậy là nó nằm trong folder BCS10-TanPhong-Elearning

// cận thận bị nhầm với ELEARNING_CUOIKHOA

// tự nhiên hết lỗi nhỉ kaka chắc do cái countup của em nãy tại em không gitt add gì được kh start được luôn để em qua master check lại
 //lúc nào vô cũng phải gõ cái lệnh countup này hả anh yarn add react-countup
 // à không lệnh đó để cài mà

 // cái chỗ bên ngoài này là sourrce nào vậy em xóa đi anh

 // giờ em git add được r đúng kh anh để e test thử