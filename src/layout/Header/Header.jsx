import React, { useContext, useEffect, useState } from "react";
import logo from "./../../assets/img/logo.png";
import avatar from "./../../assets/img/avatar.png";
import { NavLink, Link } from "react-router-dom";
import styles from "./../Header/header.scss";
import { Button, Dropdown, Menu, Input } from "antd";
import { coursesManagementServ } from "../../services/coursesManagement";
import { getLocalStorage } from "../../utils/util";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import useResponsive from "../../hooks/useResponsive";

const Header = () => {
  const notify = useContext(NotifyContext);
  const [categories, setCategories] = useState([]);
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { Search } = Input;
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCourseCatalogs = async () => {
      try {
        const response = await coursesManagementServ.getCoureCatalogs();
        setCategories(response.data);
      } catch (error) {
        notify(error.data);
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
  const handleDropdownClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định
    e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    const dropdownElement = document.querySelector(".ant-dropdown");
    if (dropdownElement && !dropdownElement.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const tabletMenu = (
    <Menu>
      <Menu.Item key="search">
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
      </Menu.Item>
      <Menu.Item key="categories">
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
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isDesktop && (
        <header className={`${styles.header}, ${cls}`}>
          <nav
            className="text-base "
            style={{ background: "rgba(255,255,255,.8)" }}
          >
            <div className="container flex flex-row justify-between items-center w-11/12">
              <a href="/" className="flex items-center">
                <img src={logo} className="h-20" alt="Logo" />
              </a>
              <div className="flex items-center  lg:order-2">
                {isLoggedIn ? (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="infomation">
                          <NavLink
                            to={`/Thongtintaikhoan/${userLocal.taiKhoan}/${userLocal.maLoaiNguoiDung}`}
                          >
                            Thông tin cá nhân
                          </NavLink>
                        </Menu.Item>
                        <Menu.Item key="logOut" onClick={handleLogout}>
                          Đăng xuất
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottom"
                    arrow
                    // trigger={["hover"]}
                  >
                    <button className="flex items-center justify-center">
                      <img
                        className="w-10 h-10 mr-1"
                        src={avatar}
                        alt="avatar"
                      />
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
      )}
      {isTablet && (
        <header className={`${styles.header}, ${cls}`}>
          <nav
            className="text-base flex items-center justify-center  "
            style={{ background: "rgba(255,255,255,.8)" }}
          >
            <div className="container w-full items-center justify-center">
              <div className="flex flex-row items-center justify-center ">
                <div className="w-1/3">
                  <a href="/" className=" items-center ">
                    <img src={logo} className="h-20" alt="Logo" />
                  </a>
                </div>
                <div className="w-1/2 items-center text-center ">
                  <Dropdown
                    overlay={tabletMenu}
                    placement="bottom"
                    arrow
                    visible={isDropdownOpen}
                    onVisibleChange={setIsDropdownOpen}
                  >
                    <Button
                      className="text-base font-sans bg-yellow-300 hover:bg-yellow-400"
                      onClick={handleDropdownClick}
                    >
                      <i className="fa-sharp fa-solid fa-bars mr-2 text-base" />
                    </Button>
                  </Dropdown>
                </div>
                <div className="items-center">
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
                          <Menu.Item onClick={handleLogout}>
                            Đăng xuất
                          </Menu.Item>
                        </Menu>
                      }
                      placement="bottom"
                      arrow
                      // trigger={["hover"]}
                    >
                      <button className="text-center items-center justify-center">
                        <img
                          className="w-10 h-10 mr-1"
                          src={avatar}
                          alt="avatar"
                        />
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
      )}
      {isMobile && (
        <header className={`${styles.header}, ${cls}`}>
          <nav
            className="text-base flex items-center justify-center  "
            style={{ background: "rgba(255,255,255,.8)" }}
          >
            <div className="container w-11/12">
              <div className="flex flex-row items-center justify-center ">
                <div className="w-1/2">
                  <a href="/" className=" items-center ">
                    <img src={logo} className="h-20" alt="Logo" />
                  </a>
                </div>
                <div className="w-1/2 flex flex-row justify-between items-center">
                  <div className=" items-center text-center ml-1 ">
                    <Dropdown
                      overlay={tabletMenu}
                      placement="bottom"
                      arrow
                      visible={isDropdownOpen}
                      onVisibleChange={setIsDropdownOpen}
                    >
                      <Button
                        className="text-base font-sans bg-yellow-300 hover:bg-yellow-400"
                        onClick={handleDropdownClick}
                      >
                        <i className="fa-sharp fa-solid fa-bars mr-2 text-base" />
                      </Button>
                    </Dropdown>
                  </div>
                  <div className="items-center">
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
                            <Menu.Item onClick={handleLogout}>
                              Đăng xuất
                            </Menu.Item>
                          </Menu>
                        }
                        placement="bottom"
                        arrow
                        // trigger={["hover"]}
                      >
                        <button className="text-center">
                          <img
                            className="w-10 h-10"
                            src={avatar}
                            alt="avatar"
                          />
                        </button>
                      </Dropdown>
                    ) : (
                      <div>
                        <NavLink
                          to="/sign-in"
                          className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-sans rounded-lg text-xs px-4 lg:px-5 py-2 lg:py-2.5 "
                        >
                          Đăng nhập
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
