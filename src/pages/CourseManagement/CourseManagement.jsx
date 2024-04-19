import React, { Fragment, useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import { NotifyContext } from "../../template/AdminTemplate/AdminTemplate";
import { BookOutlined } from "@ant-design/icons";
import { coursesManagementServ } from "../../services/coursesManagement";

const CourseManagement = () => {
  const notify = useContext(NotifyContext);
  const [deleteFilmId, setDeleteFilmId] = useState("");
  const [arrCourse, setArrCourse] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    page: 10,
  });
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await coursesManagementServ.getCourseList();
        const sortCourses = res.data.reverse();
        setArrCourse(sortCourses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, [notify]);

  // useEffect(() => {
  //   setArrMovie(initialArrMovie);
  // }, [initialArrMovie]);

  // const handleDeleteFilm = (maPhim) => {
  //   if (window.confirm("Bạn có chắc muốn xoá phim này?")) {
  //     quanLyPhimServ
  //       .deleteFilm(maPhim)
  //       .then((res) => {
  //         setDeleteFilmId(maPhim);
  //         notify("Xoá phim thành công");
  //         dispatch(getAllMovieThunk("abc"));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  const { Search } = Input;

  // const onSearch = async (value = "") => {
  //   notify("Đang tìm kiếm...");
  //   try {
  //     let res;
  //     if (value.trim() !== "") {
  //       res = await quanLyPhimServ.getAllMovie(value);
  //     } else {
  //       res = await quanLyPhimServ.getAllMovie();
  //     }
  //     setArrMovie(res.data.content);
  //   } catch (err) {
  //     console.log("Error while searching", err);
  //   }
  // };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: "5%",
      align: "center",
      render: (text, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      // sorter: (a, b) => a.key - b.key,
      // defaultSortOrder: "descend",
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
                to={`/admin/quan-li-khoa-hoc/edit/${course.maKhoaHoc}`}
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
                // onClick={() => handleDeleteFilm(course.maKhoaHoc)}
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
    setPagination(pagination);
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
          // onSearch={onSearch}
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
        pagination={pagination}
        onChange={onChange}
        rowKey={(record) => record.maKhoaHoc}
      />
    </div>
  );
};

export default CourseManagement;
