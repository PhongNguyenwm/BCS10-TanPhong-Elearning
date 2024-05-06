import React, { useEffect, useState } from "react";
import logo from "./../../assets/img/logo.png";
import avatar from "./../../assets/img/avatar.png";
import { NavLink } from "react-router-dom";
import styles from "./../Header/header.scss";
import { Button, Dropdown, Menu, Input } from "antd";
import { coursesManagementServ } from "../../services/coursesManagement";
import { getLocalStorage, saveLocalStorage } from "../../utils/util";

const Header = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [categories, setCategories] = useState([]);
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const { Search } = Input;
  useEffect(() => {
    const fetchCourseCatalogs = async () => {
      try {
        const response = await coursesManagementServ.getCoureCatalogs();
        setCategories(response.data);
      } catch (error) {
        console.error(error.data);
      }
    };
    fetchCourseCatalogs();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const cls = visible ? "visible" : "hidden";
  const menu = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category.maDanhMuc}>{category.tenDanhMuc}</Menu.Item>
      ))}
    </Menu>
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLocal = getLocalStorage("user");
  useEffect(() => {
    const checkLocalStorage = () => {
      return userLocal !== null;
    };
    // Kiểm tra và cập nhật trạng thái đăng nhập khi component được mount
    setIsLoggedIn(checkLocalStorage());
  }, []);
  const handleLogout = () => {
    // localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  return (
    <header className={`${styles.header}, ${cls}`}>
      <nav
        className=" px-4 lg:px-6 py-2.5 text-base "
        style={{ background: "rgba(255,255,255,.8)" }}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-20" alt="Logo" />
          </a>
          <div className="flex items-center  lg:order-2">
            {/* <NavLink
              href="/sign-in"
              className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
            >
              Đăng nhập
            </NavLink> */}
            {isLoggedIn ? (
              <div className="flex items-center justify-center">
                <img className="w-10 h-10 mr-1" src={avatar} alt="avatar" />
                <p className="mr-2 font-bold">{userLocal.hoTen}</p>
                <button
                  onClick={handleLogout}
                  className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-sans text-base rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <NavLink
                to="/sign-in"
                className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-sans rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
              >
                Đăng nhập
              </NavLink>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {/* <li>
                <NavLink
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li> */}
              <li>
                <Search
                  placeholder="tìm kiếm khoá học"
                  className="text-base font-sans"
                  allowClear
                  enterButton="Tìm kiếm"
                  size="large"
                  onSearch={onSearch}
                />
              </li>

              <li>
                <Dropdown
                  className="bg-yellow-300 hover:bg-yellow-400 text-base font-sans"
                  overlay={menu}
                  placement="bottom"
                  arrow
                >
                  <Button className="btn-danhmuc text-base text-center font-sans bg-yellow-300 hover:bg-yellow-400">
                    <i className="fa-sharp fa-solid fa-computer mr-2 text-base" />
                    Danh mục
                  </Button>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
