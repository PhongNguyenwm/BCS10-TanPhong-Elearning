import React, { Fragment, useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import { NotifyContext } from "../../template/AdminTemplate/AdminTemplate";
import { BookOutlined } from "@ant-design/icons";
import { coursesManagementServ } from "../../services/coursesManagement";
import moment from "moment";

const CourseManagement = () => {
  const notify = useContext(NotifyContext);
  const [deleteCourse, setDeleteCourse] = useState("");
  const [arrCourse, setArrCourse] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 10,
  });
  const [originalArrCourse, setOriginalArrCourse] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await coursesManagementServ.getCourseList();

        // Chuyển ngày tạo thành đối tượng moment và lưu vào mảng mới
        const coursesWithDate = res.data.map((course) => ({
          ...course,
          momentDate: moment(course.ngayTao, "DD-MM-YYYY"),
        }));

        // Sắp xếp mảng mới theo ngày tạo mới nhất đến cũ nhất
        const sortedCourses = coursesWithDate.sort((a, b) => {
          return b.momentDate.diff(a.momentDate, "days");
        });

        // Xóa trường momentDate ra khỏi mỗi đối tượng trong mảng đã sắp xếp
        const sortedCoursesWithoutMomentDate = sortedCourses.map((course) => {
          const { momentDate, ...rest } = course;
          return rest;
        });

        setArrCourse(sortedCoursesWithoutMomentDate);
        setOriginalArrCourse(sortedCoursesWithoutMomentDate);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, [notify, deleteCourse, pagination]);

  // useEffect(() => {
  //   setArrMovie(initialArrMovie);
  // }, [initialArrMovie]);

  const handleDeleteCourse = async (maKhoaHoc) => {
    if (window.confirm("Bạn có chắc muốn xoá khoá học này?")) {
      try {
        const res = await coursesManagementServ.deleteCourse(maKhoaHoc);
        setDeleteCourse(maKhoaHoc);
        notify("Xoá khoá học thành công");
      } catch (err) {
        notify(err.response.data);
      }
    }
  };

  const { Search } = Input;
  const onSearch = async (value = "") => {
    notify("Đang tìm kiếm...");
    try {
      if (value.trim() !== "") {
        const filteredCourses = originalArrCourse.filter((course) =>
          course.tenKhoaHoc.toLowerCase().includes(value.toLowerCase())
        );
        setArrCourse(filteredCourses);
      } else {
        setArrCourse(originalArrCourse);
      }
    } catch (err) {
      console.log("Error while searching", err);
    }
  };
  const onSearchChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setArrCourse(originalArrCourse);
    }
  };

  const columns = [
    {
      title: "Ngày Tạo",
      dataIndex: "ngayTao",
      width: "5%",
      align: "center",
      // sorter: (a, b) => new Date(b.ngayTao) - new Date(a.ngayTao),
    },
    {
      title: "Mã khoá học",
      dataIndex: "maKhoaHoc",
      width: "15%",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: "15%",
      render: (text, course) => {
        return (
          <>
            <img
              src={course.hinhAnh}
              alt={course.tenKhoaHoc}
              style={{
                width: "50px",
                height: "50px",
                display: "block",
                margin: "0 auto",
              }}
              onError={(e) => {
                e.target.onError = null;
                // e.target.src = `https://picsum.photos/id/${course}/50/50`;
              }}
            />
          </>
        );
      },
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      width: "20%",
      align: "center",
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
      render: (text) => <div className="line-clamp-2">{text}</div>,
      width: "5%",
      align: "center",
    },
    {
      title: " Actions",
      dataIndex: "hanhDong",
      render: (_, course) => {
        return (
          <Fragment>
            <div className="text-center">
              <NavLink
                key={1}
                className="mr-5 text-xl"
                to={`/admin/quan-li-khoa-hoc/sua-khoa-hoc/${course.maKhoaHoc}`}
              >
                <button className="text-blue-400 hover:text-blue-500 font-sans text-base">
                  Sửa
                  <i className="fa-thin fa-pen-to-square ml-1 text-lg font-bold"></i>
                </button>
              </NavLink>
              <span
                style={{ cursor: "pointer" }}
                key={2}
                className="text-2xl mr-5"
                onClick={() => handleDeleteCourse(course.maKhoaHoc)}
              >
                <button className="text-red-400 hover:text-red-500 font-sans text-base">
                  Xoá
                  <i className="fa-thin fa-trash ml-1 text-lg font-bold"></i>
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
  const data = arrCourse;
  const onChange = (pagination, filters, sorter, extra) => {
    // setPagination(pagination);
  };

  return (
    <div>
      <h3 className="text-4xl ">Quản lý khoá học</h3>
      <div className="flex flex-wrap justify-between items-center">
        <Search
          className="mt-5 custom-search-input w-1/2"
          placeholder="Tìm kiếm khoá học"
          allowClear
          size="large"
          onSearch={onSearch}
          onChange={onSearchChange}
        />
        <NavLink
          className="items-center font-sans text-base text-black border-spacing-1 border px-4 py-3 rounded bg-yellow-300 hover:bg-yellow-400 hover:text-black"
          to="/admin/them-khoa-hoc"
        >
          Thêm khoá học
          <BookOutlined className="ml-2" />
        </NavLink>
      </div>
      <br />
      <Table
        className="text-center"
        columns={columns}
        dataSource={data}
        // pagination={pagination}
        onChange={onChange}
        rowKey={(record) => record.maKhoaHoc}
      />
    </div>
  );
};

export default CourseManagement;