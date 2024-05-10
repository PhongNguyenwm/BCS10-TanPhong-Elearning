import React, { useContext, useEffect, useState } from "react";
import { coursesManagementServ } from "../../services/coursesManagement";
import { Select, Table, Input } from "antd";
import { NotifyContext } from "../../template/AdminTemplate/AdminTemplate";
const { Search } = Input;

const EnrollCourse = ({ match }) => {
  const courseCategoriesMatch = window.location.pathname.match(
    /\/ghi-danh-khoa-hoc\/([^/]+)$/
  );
  const notify = useContext(NotifyContext);
  const [course, setCourse] = useState(null);
  const [userUnEnroll, setUserUnEnroll] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [waitListData, setWaitListData] = useState([]);
  const [searchWaitList, setSearchWaitList] = useState([]);
  const [enrolledList, setEnrolledList] = useState([]);
  const [searchEnrolledList, setSearchEnrolledList] = useState([]);

  const fetchUserUnEnroll = async (course) => {
    try {
      if (!course) {
        throw new Error("không có thông tin khoá học.");
      }
      const maKhoaHoc = course.maKhoaHoc;
      const requestData = { maKhoaHoc: maKhoaHoc };
      const res = await coursesManagementServ.getUserUnEnroll(requestData);
      setUserUnEnroll(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWaitListData = async () => {
    try {
      if (courseCategoriesMatch) {
        const courseCode = decodeURIComponent(courseCategoriesMatch[1]);
        const res = await coursesManagementServ.postEnrollWaitList(courseCode);
        setWaitListData(res.data);
        setSearchWaitList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourseStudentsList = async () => {
    try {
      if (courseCategoriesMatch) {
        const courseCode = decodeURIComponent(courseCategoriesMatch[1]);
        const res = await coursesManagementServ.postCourseStudentsList(
          courseCode
        );
        setEnrolledList(res.data);
        setSearchEnrolledList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnroll = async (selectedUser) => {
    try {
      if (selectedUser.length === 0) {
        throw new Error("Vui lòng chọn người dùng để ghi danh.");
      }
      const enrollData = {
        maKhoaHoc: course.maKhoaHoc,
        taiKhoan: selectedUser,
      };
      const res = await coursesManagementServ.postEnroll(enrollData);
      notify("Ghi danh thành công");
      setWaitListData((prevData) => [...prevData, ...res.data]);
      setSelectedUser([]);
      fetchWaitListData();
      fetchUserUnEnroll(course);
      fetchCourseStudentsList();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelEnroll = async (taiKhoan) => {
    try {
      const res = await coursesManagementServ.deletedEnroll(
        course.maKhoaHoc,
        taiKhoan
      );
      notify("huỷ ghi danh thành công");
      setWaitListData(
        waitListData.filter((user) => user.taiKhoan !== taiKhoan)
      );
      fetchUserUnEnroll(course);
      fetchCourseStudentsList();

      fetchWaitListData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchInfoCourse = async () => {
      try {
        if (courseCategoriesMatch) {
          const courseCode = courseCategoriesMatch[1];
          const res = await coursesManagementServ.getInfoCourse(courseCode);
          console.log(res.data);
          setCourse(res.data);
          fetchUserUnEnroll(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfoCourse();
    fetchWaitListData();
    fetchCourseStudentsList();
  }, [match]);

  const handleChange = (value) => {
    setSelectedUser(value);
  };

  const regexOptions = {
    escapeSpecialChars: (str) =>
      str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    caseInsensitive: "gi",
  };
  const handleSearchWaitList = (value) => {
    const regex = new RegExp(
      regexOptions.escapeSpecialChars(value),
      regexOptions.caseInsensitive
    );
    const filteredData = waitListData.filter((user) => regex.test(user.hoTen));
    setSearchWaitList(filteredData);
  };
  const handleSearchEnrolledList = (value) => {
    const regex = new RegExp(
      regexOptions.escapeSpecialChars(value),
      regexOptions.caseInsensitive
    );
    const filteredData = enrolledList.filter((user) => regex.test(user.hoTen));
    setSearchEnrolledList(filteredData);
  };
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (value === "") {
      if (type === "waitList") {
        setSearchWaitList(waitListData);
      } else if (type === "enrolledList") {
        setSearchEnrolledList(enrolledList);
      }
    }
  };

  const columns = [
    {
      width: "25%",
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      width: "25%",
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      width: "25%",
      title: "Bí Danh",
      dataIndex: "biDanh",
      key: "biDanh",
    },
    {
      width: "25%",
      title: "Hành Động",
      key: "action  ",
      render: (text, record) => (
        <div>
          <button
            onClick={() => handleEnroll(record.taiKhoan)}
            className="text-blue-400 hover:text-blue-500 font-sans text-base border rounded  mr-10 px-2"
          >
            Xác thực
          </button>
          <button
            onClick={() => handleCancelEnroll(record.taiKhoan)}
            className="text-red-400 hover:text-red-500 font-sans text-base border rounded px-2"
          >
            Huỷ
          </button>
        </div>
      ),
    },
  ];
  const enrolledColumns = [
    {
      width: "25%",
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      width: "25%",
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      width: "25%",
      title: "Bí Danh",
      dataIndex: "biDanh",
      key: "biDanh",
    },
    {
      width: "25%",
      title: "Hành Động",
      key: "action  ",
      render: (text, record) => (
        <div>
          <button
            onClick={() => handleCancelEnroll(record.taiKhoan)}
            className="text-red-400 hover:text-red-500 font-sans text-base border rounded px-2"
          >
            Huỷ
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h3 className="text-black text-3xl mb-5">Ghi danh khoá học</h3>
      {course && (
        <div className="flex">
          <img src={course.hinhAnh} className="flex w-1/3  mr-5"></img>
          <div className="flex-col w-1/3 ml-5 h-full">
            <h4 className="font-sans text-lg font-bold mb-3">
              {course.tenKhoaHoc}
            </h4>
            <p className="font-sans text-base mb-2">
              Giảng Viên: {course.nguoiTao.hoTen}
            </p>
            <p className="font-sans text-base mb-2">
              Lượt xem: {course.luotXem}
            </p>
            <p className="font-sans text-base mb-2">Mô tả: {course.moTa}</p>
          </div>
          <div className="w-1/3 text-center">
            <h4 className="font-sans text-lg font-bold mb-3">
              Chọn người dùng
            </h4>
            <Select
              placeholder="tên người dùng(có thể search)"
              showSearch="true"
              allowClear="true"
              size="large"
              style={{ width: "100%" }}
              onChange={handleChange}
              options={userUnEnroll.map((user) => ({
                value: user.taiKhoan,
                label: user.hoTen,
              }))}
              value={selectedUser}
            />
            <button
              onClick={() => handleEnroll(selectedUser)}
              className="items-center text-center font-sans text-base text-black border-spacing-1 border px-4 py-3 rounded bg-yellow-300 hover:bg-yellow-400 hover:text-black mt-5"
            >
              Ghi danh
            </button>
          </div>
        </div>
      )}
      <hr className="my-5" />
      <div className="mt-5">
        <div className="flex justify-between mb-5">
          <h4 className="font-sans text-lg font-bold mb-3">
            Học viên chờ xác thực
          </h4>
          <Search
            placeholder="Tìm kiếm tên người dùng"
            onSearch={(value) => handleSearchWaitList(value)}
            className=" w-1/2"
            onChange={(e) => handleInputChange(e, "waitList")}
            size="large"
          />
        </div>
        <Table
          className="font-sans text-base"
          columns={columns}
          dataSource={searchWaitList}
        />
      </div>
      <hr className="my-5" />
      <div className="mt-5">
        <div className="flex justify-between mb-5">
          <h4 className="font-sans text-lg font-bold mb-3">
            Học viên đã tham gia khoá học
          </h4>
          <Search
            placeholder="Tìm kiếm tên người dùng"
            onSearch={(value) => handleSearchEnrolledList(value)}
            className=" w-1/2"
            onChange={(e) => handleInputChange(e, "enrolledList")}
            size="large"
          />
        </div>
        <Table
          className="font-sans text-base"
          columns={enrolledColumns}
          dataSource={searchEnrolledList}
        />
      </div>
    </div>
  );
};

export default EnrollCourse;
