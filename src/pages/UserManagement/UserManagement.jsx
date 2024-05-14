import React, { Fragment, useContext, useEffect, useState } from "react";
import { Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import {
  EditOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { userManagementServ } from "../../services/userManagement";
import { NavLink } from "react-router-dom";
import { NotifyContext } from "../../template/AdminTemplate/AdminTemplate";

const UserManagerment = () => {
  const notify = useContext(NotifyContext);
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await userManagementServ.getUserList();
      setUserList(result.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = async (value) => {
    try {
      const result = await userManagementServ.findUser({
        params: { tuKhoa: value },
      });
      setUserList(result.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      fetchData();
    }
  };

  const handleDeleteUser = async (taiKhoan) => {
    if (window.confirm("Bạn chắc chắn muốn xoá người dùng này?")) {
      try {
        await userManagementServ.deleteUser(taiKhoan);
        notify("Xoá người dùng thành công!");
        fetchData();
      } catch (err) {
        notify(err.response.data);
      }
    }
  };

  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      align: "center",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Số Điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      align: "center",
    },
    {
      title: "Mã Loại",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (text) => {
        let color = text.trim() === "GV" ? "red" : "green";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
      align: "center",
    },
    {
      title: " Actions",
      dataIndex: "hanhDong",
      render: (_, user) => {
        return (
          <Fragment>
            <div className="text-center">
              <NavLink
                key={1}
                className="mr-2 text-base font-sans "
                to={`/admin/quan-li-nguoi-dung/ghi-danh-khoa-hoc/${user.taiKhoan}`}
              >
                <button className="font-sans text-base text-blue-400 hover:text-blue-500 mr-1">
                  Ghi danh
                </button>
              </NavLink>
              <NavLink
                key={2}
                className=" mr-2 text-xl"
                to={`/admin/quan-li-nguoi-dung/sua-nguoi-dung/${user.taiKhoan}`}
              >
                <button className="text-orange-400 hover:text-orange-500 font-sans text-base">
                  {/* Sửa */}
                  <EditOutlined className="ml-1 text-xl font-extrabold" />
                </button>
              </NavLink>
              <span
                style={{ cursor: "pointer" }}
                key={3}
                className="text-xl mr-5"
                onClick={() => handleDeleteUser(user.taiKhoan)}
              >
                <button className="text-red-500 hover:text-red-600 font-sans text-base">
                  {/* Xóa */}
                  <UserDeleteOutlined className="ml-1 text-xl font-bold" />
                </button>
              </span>
            </div>
          </Fragment>
        );
      },

      width: "15%",
      align: "center",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {};

  return (
    <div>
      <h3 className="text-4xl mb-5">Quản lý người dùng</h3>
      <div className="flex flex-wrap justify-between items-center">
        <Search
          className="custom-search-input w-1/2"
          placeholder="Tìm tài khoản, Tên hoặc SDT"
          allowClear
          size="large"
          onSearch={handleSearch}
          onChange={handleInputChange}
        />
        <NavLink
          key={1}
          className="items-center font-sans text-base text-black border-spacing-1 border px-4 py-3 rounded bg-yellow-300 hover:bg-yellow-400 hover:text-black"
          to="/admin/quan-li-nguoi-dung/them-nguoi-dung"
        >
          Thêm người dùng
          <UserAddOutlined className="ml-2" />
        </NavLink>
      </div>
      <br />
      <Table
        className="text-center"
        columns={columns}
        dataSource={userList}
        onChange={onChange}
      />
    </div>
  );
};

export default UserManagerment;
