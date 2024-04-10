import React, { useEffect, useState } from "react";
import logo from "./../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import "./../Header/header.scss";

const Header = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
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
  return (
    <header className={cls}>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-20" alt="Logo" />
          </a>
          <div className="flex items-center lg:order-2">
            <NavLink
              href="#"
              className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
            >
              Đăng nhập
            </NavLink>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 "
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
