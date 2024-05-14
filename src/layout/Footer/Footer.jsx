import React from "react";
import "./Footer.scss";
export default function Footer() {
  return (
    <div className="footer container-fluid">
      <div className="footer_body">
        <div>
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <a href="" className="mr-5 text_logo mb-3 font-bold">
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
                  <i className="fas fa-chevron-right mb-2" /> Trang chủ
                </li>
                <li>
                  <i className="fas fa-chevron-right mb-2" /> Dịch vụ
                </li>
                <li>
                  <i className="fas fa-chevron-right mb-2" /> Nhóm
                </li>
                <li>
                  <i className="fas fa-chevron-right mb-2" /> Blog
                </li>
              </ul>
            </div>
            <div className="col-span-3">
              <h3 className="text_footerTitle footerTitle_1 font-bold mb-3">Khóa Học</h3>
              <ul className="menu_footer menu3">
                <li>
                  <i className="fas fa-chevron-right" /> Front End
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Back End
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Full stack
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Node Js
                </li>
              </ul>
            </div>
            <div className="col-span-3">
              <h3 className="text_footerTitle footerTitle font-bold mb-3">
                Đăng Kí Tư Vấn
              </h3>
              <form action="">
                <div>
                  <input
                    className="formFooter"
                    type="text"
                    placeholder="Họ và tên"
                    fdprocessedid="zoeb1"
                  />
                  <input
                    className="formFooter"
                    type="text"
                    placeholder="Email"
                    fdprocessedid="54nhv"
                  />
                  <input
                    className="formFooter"
                    type="text"
                    placeholder="Số điện thoại"
                    fdprocessedid="0tx9xk"
                  />
                </div>
              </form>
              <button className="custom-btn btnGlobal mt-3" fdprocessedid="po29hm">Đăng kí</button>

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
