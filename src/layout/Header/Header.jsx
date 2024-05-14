import React, { useContext, useEffect, useState } from "react";
import logo from "./../../assets/img/logo.png";
import avatar from "./../../assets/img/avatar.png";
import { NavLink, Link } from "react-router-dom";
import styles from "./../Header/header.scss";
import { Button, Dropdown, Menu, Input } from "antd";
import { coursesManagementServ } from "../../services/coursesManagement";
import { getLocalStorage } from "../../utils/util";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";

const Header = () => {
  const notify = useContext(NotifyContext);
  const [categories, setCategories] = useState([]);
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
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
  const menuCourseCatalog = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category.maDanhMuc}>
          <Link
            to={{
              pathname: "/DanhMucKhoaHoc",
              search: `?MaDanhMuc=${category.maDanhMuc}&categoryName=${category.tenDanhMuc}&MaNhom=GP01`,
            }}
          >
            {category.tenDanhMuc}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLocal = getLocalStorage("user");
  useEffect(() => {
    const checkLocalStorage = () => {
      return userLocal !== null;
    };
    setIsLoggedIn(checkLocalStorage());
  }, []);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      const searchPath = `/TimKiemKhoaHoc?tenKhoaHoc=${searchValue}`;
      window.location.href = searchPath;
    } else {
      notify("Vui lòng nhập từ khoá tìm kiếm");
    }
  };
  return (
    <header className={`${styles.header}, ${cls}`}>
      <nav
        className="text-base "
        style={{ background: "rgba(255,255,255,.8)" }}
      >
        <div className="container flex flex-wrap justify-between items-center w-11/12">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-20" alt="Logo" />
          </a>
          <div className="flex items-center  lg:order-2">
            {isLoggedIn ? (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <NavLink
                        to={`/Thongtintaikhoan/${userLocal.taiKhoan}/${userLocal.maLoaiNguoiDung}`}
                      >
                        Thông tin cá nhân
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
                  </Menu>
                }
                placement="bottom"
                arrow
                trigger={["hover"]}
              >
                <button className="flex items-center">
                  <img className="w-10 h-10 mr-1" src={avatar} alt="avatar" />
                  <p className="mr-2 font-bold">{userLocal.hoTen}</p>
                </button>
              </Dropdown>
            ) : (
              <div>
                <NavLink
                  to="/sign-in"
                  className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-sans rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                >
                  Đăng nhập
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-sans rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
                >
                  Đăng ký
                </NavLink>
              </div>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Search
                  placeholder="tìm kiếm khoá học"
                  className="text-base font-sans"
                  allowClear
                  enterButton="Tìm kiếm"
                  size="large"
                  onChange={(e) => setSearchValue(e.target.value)}
                  onPressEnter={handleSearch}
                  value={searchValue}
                  onSearch={handleSearch}
                />
              </li>

              <li>
                <Dropdown
                  className="bg-yellow-300 hover:bg-yellow-400 text-base font-sans"
                  overlay={menuCourseCatalog}
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
