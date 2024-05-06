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
    return http.post("/QuanLyKhoaHoc/CapNhatKhoaHocUpload", formdata);
  },
};
