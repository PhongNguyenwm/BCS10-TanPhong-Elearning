import { getLocalStorage } from "../utils/util";
import { http } from "./config";
const userLocal = getLocalStorage("user");

export const coursesManagementServ = {
  getCourseListDetail: (maKhoaHoc) => {
    console.log("🚀 ~ maKhoaHoc:", maKhoaHoc);
    return http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`);
  },
  getCoureCatalogs: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getCourseList: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
  },
  getInfoCourse: (courseCode) => {
    return http.get(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseCode}`);
  },
  deleteCourse: (courseCode) => {
    return http.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseCode}`, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  addCourse: (formData) => {
    return http.post("/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  editCourse: (formdata) => {
    return http.post("QuanLyKhoaHoc/CapNhatKhoaHocUpload", formdata);
  },
  getUserUnEnroll: (course) => {
    const courseCode = course.maKhoaHoc;
    const requestData = { maKhoaHoc: courseCode };

    return http.post(
      `/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh `,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${userLocal.accessToken}`,
        },
      }
    );
  },
  postEnroll: (enrollData) => {
    return http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", enrollData, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  postEnrollWaitList: (courseCode) => {
    const data = { maKhoaHoc: courseCode };
    return http.post(`/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  postCourseStudentsList: (courseCode) => {
    const data = { maKhoaHoc: courseCode };
    return http.post(`/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, data, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  deletedEnroll: (courseCode, taiKhoan) => {
    const data = { maKhoaHoc: courseCode, taiKhoan: taiKhoan };
    return http.post("/QuanLyKhoaHoc/HuyGhiDanh", data, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  getCoursesByCatalog: (categoryCode) => {
    return http.get(
      `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${categoryCode}&MaNhom=GP01`
    );
  },
  registerCourse: (data) => {
    return http.post("/QuanLyKhoaHoc/DangKyKhoaHoc", data, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  findCourseList: (data) => {
    return http.get(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${data}&MaNhom=GP01`
    );
  },
};
