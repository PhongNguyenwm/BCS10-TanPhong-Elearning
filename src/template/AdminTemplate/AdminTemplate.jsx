import React, { useContext, useState } from "react";
import avatar from "./../../assets/img/avatar.png";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useEffect } from "react";
import { getLocalStorage } from "../../utils/util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Sider, Content } = Layout;

export const NotifyContext = React.createContext(null);
const AdminTemplate = () => {
  const userLocal = getLocalStorage("user");
  useEffect(() => {
    // thực hiện lấy dữ liệu từ local lên để kiểm tra
    // Hello Thành
    const user = getLocalStorage("user");
    // console.log(user);
    if (!user) {
      window.location.href = "https://google.com";
    }
    if (user?.maLoaiNguoiDung !== "GV") {
      window.location.href = "https://google.com";
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Quản lí người dùng, quản lí phim, quản lí lịch chiếu

  const renderNotify = (notify) => {
    return toast(notify);
  };

  return (
    <NotifyContext.Provider value={renderNotify}>
      <ToastContainer autoClose={2000} />
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <BookOutlined />,
                label: (
                  <NavLink to="/admin/quan-li-khoa-hoc">
                    Quản lí khoá học
                  </NavLink>
                ),
              },

              {
                key: "2",
                icon: <UserOutlined />,
                label: (
                  <NavLink to="/admin/quan-li-nguoi-dung">
                    Quản lý người dùng
                  </NavLink>
                ),
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "static",
              width: "auto",
              zIndex: 0,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="flex items-center mr-5 lg:order-2">
              {userLocal ? (
                <>
                  <img className="w-10 h-10 mr-1" src={avatar} alt="" />
                  <p className="text-base font-sans">{userLocal.hoTen}</p>
                </>
              ) : (
                <NavLink
                  to="/sign-in"
                  className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none "
                >
                  Đăng nhập
                </NavLink>
              )}
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="mt-16"
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </NotifyContext.Provider>
  );
};

export default AdminTemplate;
