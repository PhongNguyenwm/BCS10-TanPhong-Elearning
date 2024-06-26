import React, { useContext, useState } from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
export default function Footer() {
  const notify = useContext(NotifyContext);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", email: "", phone: "" });
    notify("Đăng kí thành công, Chúng tôi sẽ sớm liên hệ với bạn!");
  };
  return (
    <div className="footer container-fluid">
      <div className="footer_body">
        <div>
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <a href="/" className="mr-5 text_logo mb-3 font-bold">
                <span className="textE text-4xl ">E</span> learning
                <i className="far fa-keyboard iconLogo"></i>
              </a>
              <ul className="menu_footer menu2">
                <li>
                  <i className="fas fa-phone-alt iconFooter" />

                  <span>1800-123-4567</span>
                </li>
                <li>
                  <i className="fas fa-envelope-open-text iconFooter" />
                  <span>devit@gmail.com</span>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt iconFooter" />
                  <span>Đà Nẵng</span>
                </li>
              </ul>
            </div>
            <div className="col-span-3">
              <h3 className="text_footerTitle font-bold mb-3">Liên Kết</h3>
              <ul className="menu_footer menu1">
                <li>
                  <a href="/">
                    <i className="fas fa-chevron-right mb-2" /> Trang chủ
                  </a>
                </li>
                <li>
                  <Link to="/TrangDangXayDung">
                    <i className="fas fa-chevron-right mb-2" /> Dịch vụ
                  </Link>
                </li>
                <li>
                  <Link to="/TrangDangXayDung">
                    <i className="fas fa-chevron-right mb-2" /> Nhóm
                  </Link>
                </li>
                <li>
                  <Link to="/TrangDangXayDung">
                    <i className="fas fa-chevron-right mb-2" /> Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-3">
              <h3 className="text_footerTitle footerTitle_1 font-bold mb-3">
                Khóa Học
              </h3>
              <ul className="menu_footer menu3">
                <li>
                  <a href="/DanhMucKhoaHoc?MaDanhMuc=FrontEnd&categoryName=Lập%20trình%20Front%20end&MaNhom=GP01">
                    <i className="fas fa-chevron-right" /> Front End
                  </a>
                </li>
                <li>
                  <a href="/DanhMucKhoaHoc?MaDanhMuc=BackEnd&categoryName=Lập%20trình%20Backend&MaNhom=GP01">
                    <i className="fas fa-chevron-right" /> Back End
                  </a>
                </li>
                <li>
                  <a href="/DanhMucKhoaHoc?MaDanhMuc=FullStack&categoryName=Lập%20trình%20Full%20Stack&MaNhom=GP01">
                    <i className="fas fa-chevron-right" /> Full stack
                  </a>
                </li>
                <li>
                  <a href="/DanhMucKhoaHoc?MaDanhMuc=DiDong&categoryName=Lập%20trình%20di%20động&MaNhom=GP01">
                    <i className="fas fa-chevron-right" /> Di Động
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-3">
              <h3 className="text_footerTitle footerTitle font-bold mb-3">
                Đăng Kí Tư Vấn
              </h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="formFooter"
                    type="text"
                    name="name"
                    placeholder="Họ và tên"
                    fdprocessedid="zoeb1"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    className="formFooter"
                    type="text"
                    name="email"
                    placeholder="Email"
                    fdprocessedid="54nhv"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    className="formFooter"
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    fdprocessedid="0tx9xk"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="custom-btn btnGlobal mt-3 rounded"
                    fdprocessedid="po29hm"
                  >
                    Đăng kí
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="extra_footer mt-5">
            <div className="text-cardTitle">
              <p>Copyright © 2021. All rights reserved.</p>
            </div>
            <div class="divGlobal p-0">
              <i class="fab fa-instagram iconFooter iconSize"></i>
              <i class="fab fa-facebook-f iconFooter iconSize"></i>
              <i class="fab fa-twitter iconFooter iconSize"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
