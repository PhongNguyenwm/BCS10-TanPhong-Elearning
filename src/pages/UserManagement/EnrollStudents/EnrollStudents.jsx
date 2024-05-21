import React, { useContext, useEffect, useState } from "react";
import { userManagementServ } from "../../../services/userManagement";
import { coursesManagementServ } from "../../../services/coursesManagement";
import { Select, Table, Input } from "antd";
import { NotifyContext } from "../../../template/AdminTemplate/AdminTemplate";
import avatar from "../../../assets/img/avatar.png";
const { Search } = Input;

const EnrollStudents = ({ match }) => {
  const studentMatch = window.location.pathname.match(
    /\/ghi-danh-khoa-hoc\/([^/]+)$/
  );
  const notify = useContext(NotifyContext);
  const [student, setStudent] = useState(null);
  const [coursesUnEnroll, setCoursesUnEnroll] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [waitListData, setWaitListData] = useState([]);
  const [searchWaitList, setSearchWaitList] = useState([]);
  const [enrolledList, setEnrolledList] = useState([]);
  const [searchEnrolledList, setSearchEnrolledList] = useState([]);

  const fetchCoursesUnEnroll = async () => {
    try {
      const account = studentMatch[1];
      const res = await userManagementServ.getCourseUnEnroll(account);
      setCoursesUnEnroll(res.data);
    } catch (err) {
      notify(err.response.data);
    }
  };
  const fetchWaitListData = async () => {
    try {
      if (studentMatch) {
        const studentAcc = decodeURIComponent(studentMatch[1]);
        const requestData = { taiKhoan: studentAcc };
        const res = await userManagementServ.getWaitListCourses(requestData);
        setWaitListData(res.data);
        setSearchWaitList(res.data);
      }
    } catch (err) {
      notify(err.response.data);
    }
  };
  const fetchEnrolledCourses = async () => {
    try {
      if (studentMatch) {
        const studentAcc = decodeURIComponent(studentMatch[1]);
        const requestData = { taiKhoan: studentAcc };
        const res = await userManagementServ.getEnrolledCourses(requestData);
        setEnrolledList(res.data);
        setSearchEnrolledList(res.data);
      }
    } catch (err) {
      notify(err.response.data);
    }
  };
  const handleEnroll = async (selectedCourse) => {
    try {
      if (selectedCourse.length === 0) {
        notify("Vui lòng chọn khoá học để ghi danh.");
      }
      const enrollData = {
        maKhoaHoc: selectedCourse,
        taiKhoan: student.taiKhoan,
      };
      const res = await coursesManagementServ.postEnroll(enrollData);
      notify("Ghi danh thành công");
      setWaitListData((prevData) => [...prevData, ...res.data]);
      setSelectedCourse([]);
      fetchWaitListData();
      fetchCoursesUnEnroll();
      fetchEnrolledCourses();
    } catch (err) {
      notify(err.response.data);
    }
  };
  const handleCancelEnroll = async (courseCode) => {
    try {
      const res = await coursesManagementServ.deletedEnroll(
        courseCode,
        student.taiKhoan
      );
      notify("huỷ ghi danh thành công");
      setWaitListData((prevData) =>
        prevData.filter((course) => course.maKhoaHoc !== courseCode)
      );
      fetchCoursesUnEnroll();
      fetchWaitListData();
      fetchEnrolledCourses();
    } catch (err) {
      notify(err.response.data);
    }
  };
  useEffect(() => {
    const fetchStudentsInfo = async () => {
      try {
        if (studentMatch) {
          const studentCode = studentMatch[1];
          const res = await userManagementServ.getUserInfo(studentCode);
          setStudent(res.data[0]);
          fetchCoursesUnEnroll();
          fetchWaitListData();
          fetchEnrolledCourses();
        }
      } catch (err) {
        notify(err.response.data);
      }
    };
    fetchStudentsInfo();
  }, [match]);
  const handleChange = (value) => {
    setSelectedCourse(value);
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
    const filteredData = waitListData.filter((course) =>
      regex.test(course.tenKhoaHoc)
    );
    setSearchWaitList(filteredData);
  };
  const handleSearchEnrolledList = (value) => {
    const regex = new RegExp(
      regexOptions.escapeSpecialChars(value),
      regexOptions.caseInsensitive
    );
    const filteredData = enrolledList.filter((course) =>
      regex.test(course.tenKhoaHoc)
    );
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
  const waitListColumns = [
    {
      width: "33%",
      title: "Mã khoá học ",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      width: "33%",
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      width: "34%",
      title: "Hành Động",
      key: "action  ",
      render: (text, record) => (
        <div>
          <button
            onClick={() => handleEnroll(record.maKhoaHoc)}
            className="text-blue-400 hover:text-blue-500 font-sans text-base border rounded  mr-10 px-2"
          >
            Xác thực
          </button>
          <button
            onClick={() => handleCancelEnroll(record.maKhoaHoc)}
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
      width: "33%",
      title: "Mã khoá học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      width: "33%",
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      width: "34%",
      title: "Hành Động",
      key: "action  ",
      render: (text, record) => (
        <div>
          <button
            onClick={() => handleCancelEnroll(record.maKhoaHoc)}
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
      {student && (
        <div className="flex">
          <img
            src={avatar}
            style={{ width: "200px" }}
            className="flex w-1/3  mr-5"
          ></img>
          <div className="flex-col w-1/3 ml-5 h-full">
            <h4 className="font-sans text-lg font-bold mb-3">
              Tài khoản: {student.taiKhoan}
            </h4>
            <p className="font-sans text-base mb-2">
              Tên học viên: {student.hoTen}
            </p>
            <p className="font-sans text-base mb-2">Email: {student.email}</p>
            <p className="font-sans text-base mb-2">
              Điện thoại: {student.soDt}
            </p>
            <p className="font-sans text-base mb-2">
              Chức danh: {student.tenLoaiNguoiDung}
            </p>
          </div>
          <div className="w-full text-center">
            <h4 className="font-sans text-lg font-bold mb-3">Chọn khoá học</h4>
            <Select
              placeholder="Tên khoá học(có thể search)"
              showSearch="true"
              allowClear="true"
              size="large"
              style={{ width: "85%" }}
              onChange={handleChange}
              options={coursesUnEnroll.map((course) => ({
                value: course.maKhoaHoc,
                label: course.tenKhoaHoc,
              }))}
              value={selectedCourse}
            />
            <br />
            <button
              onClick={() => handleEnroll(selectedCourse)}
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
            Khoá học chờ xét duyệt
          </h4>
          <Search
            placeholder="Tìm kiếm khoá học"
            onSearch={(value) => handleSearchWaitList(value)}
            className=" w-1/2"
            onChange={(e) => handleInputChange(e, "waitList")}
            size="large"
            allowClear="true"
          />
        </div>
        <Table
          className="font-sans text-base"
          columns={waitListColumns}
          dataSource={searchWaitList}
        />
      </div>
      <hr className="my-5" />
      <div className="mt-5">
        <div className="flex justify-between mb-5">
          <h4 className="font-sans text-lg font-bold mb-3">
            Khoá học đã tham gia
          </h4>
          <Search
            placeholder="Tìm kiếm khoá học"
            onSearch={(value) => handleSearchEnrolledList(value)}
            className=" w-1/2"
            onChange={(e) => handleInputChange(e, "enrolledList")}
            size="large"
            allowClear="true"
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

export default EnrollStudents;
