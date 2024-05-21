import React, { useEffect, useState } from "react";
import "./InfomationDetail.scss";
import instructor1 from "../../assets/img/instrutor1.jpg";
import { useParams, useNavigate } from "react-router-dom";
import { coursesManagementServ } from "../../services/coursesManagement";
import ReferenceCourse from "../../layout/PopularCourses/ReferenceCourse";
import Footer from "../../layout/Footer/Footer";
import { getLocalStorage } from "../../utils/util";
import { useContext } from "react";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";

export default function InformationDetail() {
  const [courseDetail, setCourseDetail] = useState(null);
  const { maKhoaHoc } = useParams();
  const userLocal = getLocalStorage("user");
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();

  useEffect(() => {
    coursesManagementServ
      .getCourseListDetail(maKhoaHoc)
      .then((res) => {
        setCourseDetail(res.data);
      })
      .catch((err) => {
        notify(err.response.data);
      });
  }, [maKhoaHoc]);

  const handleRegisterCourse = async () => {
    try {
      const enrollData = {
        maKhoaHoc: maKhoaHoc,
        taiKhoan: userLocal.taiKhoan,
      };
      await coursesManagementServ.registerCourse(enrollData);
      notify("đăng ký thành công");
    } catch (err) {
      notify(err.response.data);
    }
  };

  const handlePreviewClick = () => {
    navigate("/TrangDangXayDung"); // Chuyển hướng đến trang đang xây dựng
  };

  return (
    <div className="">
      <div className="content_detail">
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <h4 className="mt-14 font-bold text-2xl">
              {courseDetail?.tenKhoaHoc}
            </h4>
            <div className=" grid grid-cols-12 head_detail">
              <div className="col-span-4">
                <div className="detail_teacher">
                  <div className="">
                    <img src={instructor1} alt="" />
                  </div>
                  <div className="teacher_content">
                    <p className="teacher_p1">Giảng viên</p>

                    <p>{courseDetail?.nguoiTao?.hoTen}</p>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="detailCourseIntro">
                  <div className="detail_teacher">
                    <i class="fas fa-graduation-cap"></i>
                    <div className="teacher_content">
                      <p className="teacher_p1">Lĩnh vực</p>
                      <p>{courseDetail?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="detailCourseIntro detailCourseIntro1">
                  <div className="detai_teacher">
                    <div className="reviewDetail">
                      <span className="font-semibold">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        4.5
                      </span>
                      <p>100 đánh giá</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="textDiscripts">
              <p>{courseDetail?.moTa}</p>
              <div className="detail_learn">
                <h6 className="text-2xl mt-5 mb-2">Những gì bạn sẽ học</h6>
                <div className="grid grid-cols-12 detail_content">
                  <div className="col-span-6">
                    <ul>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân
                          thiện với người dùng và phản ứng nhanh
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Đăng ký công việc được trả lương cao hoặc làm
                          freelancer trong một trong những lĩnh vực được yêu cầu
                          nhiều nhất mà bạn có thể tìm thấy trong web dev ngay
                          bây giờ
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Cung cấp trải nghiệm người dùng tuyệt vời bằng cách
                          tận dụng sức mạnh của JavaScript một cách dễ dàng
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Tìm hiểu tất cả về React Hooks và React Components
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-6">
                    <ul>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Thông thạo chuỗi công cụ hỗ trợ React, bao gồm cú pháp
                          Javascript NPM, Webpack, Babel và ES6 / ES2015
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Nhận ra sức mạnh của việc xây dựng các thành phần có
                          thể kết hợp
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Hãy là kỹ sư giải thích cách hoạt động của Redux cho
                          mọi người, bởi vì bạn biết rất rõ các nguyên tắc cơ
                          bản
                        </a>
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        <a href>
                          Nắm vững các khái niệm cơ bản đằng sau việc cấu trúc
                          các ứng dụng Redux
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className=" ">
                <h6 className="course_content text-xl mt-5">
                  Nội Dung Khóa Học
                </h6>
                <div>
                  <div className="courseDetail_item mt-5">
                    <div className="courseDetail_content">
                      <div className="section_course">
                        <span>Mục 1: Giới thiệu</span>
                        <button
                          onClick={handlePreviewClick}
                          className="btnGlobal btnReview"
                        >
                          Xem Trước
                        </button>
                      </div>
                    </div>
                  </div>
                  <h1>Bài Học</h1>
                  <div classname="lesson_container">
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Các khái niệm về React Component
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Thiết lập môi trường cho Windows
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Tạo ứng dụng React - React-Scripts
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Ghi chú nhanh về dấu ngoặc kép cho string interpolation
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className=" ">
                <div>
                  <div className="courseDetail_item mt-5">
                    <div className="courseDetail_content">
                      <div className="section_course">
                        <span>MỤC 2: KIẾN THỨC CĂN BẢN</span>
                        <button
                          onClick={handlePreviewClick}
                          className="btnGlobal btnReview"
                        >
                          Xem Trước
                        </button>
                      </div>
                    </div>
                  </div>
                  <h1>Bài Học</h1>
                  <div classname="lesson_container">
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Trang chủ và thành phần thư mục
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Hướng dẫn khóa học + Liên kết Github
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Trang chủ thương mại điện tử + thiết lập SASS
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Tệp CSS và SCSS
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        React 17: Cập nhật các gói + Phiên bản React mới nhất
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className=" ">
                <div>
                  <div className="courseDetail_item mt-5">
                    <div className="courseDetail_content">
                      <div className="section_course">
                        <span>MỤC 3: KIẾN THỨC CHUYÊN SÂU</span>
                        <button
                          onClick={handlePreviewClick}
                          className="btnGlobal btnReview"
                        >
                          Xem Trước
                        </button>
                      </div>
                    </div>
                  </div>
                  <h1>Bài Học</h1>
                  <div classname="lesson_container">
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        connect() and mapStateToProps
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Trạng thái thư mục vào Redux
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Thành phần Tổng quan về Bộ sưu tập
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        14:35
                      </span>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="sideBarDetail">
              <img src={courseDetail?.hinhAnh} alt="" />
              <div className="course_price">
                <p className="font-medium">
                  <i className="fas fa-bolt" />
                  500.000<sup>đ</sup>
                </p>
              </div>
              <button
                onClick={handleRegisterCourse}
                className="btn_review font-medium"
              >
                Đăng Ký
              </button>
              <div className="sideBarDetail_content">
                <ul>
                  <li>
                    <p>
                      Ghi danh:<span> 10 học viên</span>
                    </p>
                    <i className="fas fa-user-graduate " />
                  </li>
                  <li>
                    <p>
                      Thời gian: <span> 18 giờ</span>
                    </p>
                    <i className="far fa-clock far fa-calendar-alt" />
                  </li>
                  <li>
                    <p>
                      Bài học:<span> 10</span>
                    </p>
                    <i className="fas fa-book" />
                  </li>
                  <li>
                    <p>
                      Video:<span> 14</span>
                    </p>
                    <i className="fas fa-photo-video" />
                  </li>
                  <li>
                    <p>
                      Trình độ:<span> Người mới bắt đầu</span>
                    </p>
                    <i className="fas fa-database" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ReferenceCourse />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
