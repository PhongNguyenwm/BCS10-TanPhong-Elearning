import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { Tabs } from "antd";
import EditUserHomePage from "../UserManagement/EditUser/EditUserHomePage";
import UserEnrolledList from "../UserEnrolledList/UserEnrolledList";

const onChange = (key) => {};
const items = [
  {
    key: "1",
    label: "THÔNG TIN CÁ NHÂN",
    children: <EditUserHomePage />,
  },
  {
    key: "2",
    label: "kHOÁ HỌC CỦA TÔI",
    children: <UserEnrolledList />,
  },
];

const InfomationUser = () => {
  return (
    <div className="container">
      <Header />
      <div className="mt-32 mb-10 container w-11/12 ">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="font-sans text-base"
        />
      </div>
      <Footer />
    </div>
  );
};

export default InfomationUser;
