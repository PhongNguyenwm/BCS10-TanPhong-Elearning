import React from "react";
import "./Detail.scss";
import Header from "../../layout/Header/Header";
import InformationDetail from "./InformationDetail";
import BackToTop from "../../layout/BackToTop/BackToTop";
export default function Detail() {
  return (
    <div>
      <div className="header">
        <Header/>
      </div>
      <div className="titleDetail">
        <h3 className="text-3xl font-bold mb-2">Thông Tin Khóa Học</h3>
        <p>Tiến Lên Và Không Chần Chừ !!!</p>
      </div>
      <InformationDetail/>
      <div className="back-to-top-container">
        <BackToTop />
      </div>
    </div>
  );
}
