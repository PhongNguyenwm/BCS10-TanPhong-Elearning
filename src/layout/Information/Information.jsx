import React from "react";
import "./Information.scss";
export default function Information() {
  return (
    <div className="info">
      <div className="info_content">
        <div className="info_largeitem info_item">
          <div className=" infoItemContent">
            <h3 className="font-bold">Khóa Học</h3>
            <p>
              <span>Học qua dự án thực tế</span>, học đi đôi với hành, không lý
              thuyết lan man, phân tích cội nguồn của vấn đề, xây dựng từ các ví
              dụ nhỏ đến thực thi một dự án lớn ngoài thực tế để học viên học
              xong làm được ngay
            </p>
            <ul>
              <li>
                <i className="fas fa-check " />
                <span>Hơn 1000 bài tập và dự án thực tế</span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>Công nghệ cập nhật mới nhất</span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>Hình ảnh, ví dụ, bài giảng sinh động trực quan</span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>Tư duy phân tích, giải quyết vấn đề trong dự án</span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>
                  Học tập kinh nghiệm, qui trình làm dự án, các qui chuẩn trong
                  dự án
                </span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>
                  Cơ hội thực tập tại các công ty lớn như FPT, Microsoft
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="info_smallItemA info_item">
          <div className=" infoItemContent">
            <h3 className="font-bold">LỘ TRÌNH PHÙ HỢP</h3>
            <ul>
              <li>
                <i className="fas fa-check" />
                <span>
                  Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao
                </span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>Học, luyện tập code, kỹ thuật phân tích, soft skill</span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>
                  Huấn luyện để phát triển năng lực và niềm đam mê lập trình
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="info_smallItemB info_item">
          <div className=" infoItemContent">
            <h3 className="font-bold">Hệ thống học tập</h3>
            <ul>
              <li>
                <i className="fas fa-check" />
                <span>
                  Tự động chấm điểm trắc nghiệm và đưa câu hỏi tùy theo mức độ
                  học viên
                </span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>
                  Thống kê lượt xem video, làm bài, điểm số theo chu kỳ
                </span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>
                  Thống kê, so sánh khả năng học của các học viên cùng level để
                  đưa ra mục tiêu học tập
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="info_smallItemA info_item">
          <div className=" infoItemContent">
            <h3 className="font-bold">Giảng Viên</h3>
            <ul>
              <li>
                <i className="fas fa-check" />
                <span>
                  Tương tác cùng mentor và giảng viên qua phần thảo luận
                </span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>Review code và đưa ra các nhận xét góp ý</span>
              </li>
              <li>
                <i className="fas fa-check" />
                <span>Chấm điểm tương tác thảo luận giữa các học viên</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="info_smallItemC info_item">
          <div className=" infoItemContent">
            <h3 className="font-bold">Chứng Nhận</h3>
            <ul>
              <li>
                <i class="fas fa-check"></i>
                <span>Chấm bài và có thể vấn đáp trực tuyến để review</span>
              </li>
              <li>
                <i class="fas fa-check"></i>
                <span>
                  Hệ thống của chúng tôi cũng tạo ra cho bạn một CV trực tuyến
                  độc đáo
                </span>
              </li>
              <li>
                <i class="fas fa-check"></i>
                <span>
                  Kết nối CV của bạn đến với các đối tác của V learning
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
