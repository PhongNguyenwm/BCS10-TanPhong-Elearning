import { getLocalStorage } from "../utils/util";
import { http } from "./config";

const userLocal = getLocalStorage("user");

export const userManagementServ = {
  logIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
  signUp: (data) => {
    return http.post("/QuanLyNguoiDung/DangKy", data);
  },
  getUserList: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
  },
  findUser: (data) => {
    return http.get("/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01", data);
  },
  deleteUser: (taiKhoan) => {
    return http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  addUser: (userData) => {
    return http.post("/QuanLyNguoiDung/ThemNguoiDung", userData, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  getUserTypes: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  },
  getUserInfo: (taiKhoan) => {
    return http.get(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`
    );
  },
  updateUser: (userData) => {
    return http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  getCourseUnEnroll: (taiKhoan) => {
    return http.post(
      `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`,
      taiKhoan,
      {
        headers: {
          Authorization: `Bearer ${userLocal.accessToken}`,
        },
      }
    );
  },
  getWaitListCourses: (data) => {
    return http.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  getEnrolledCourses: (data) => {
    return http.post(`/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`, data, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
  getUserEnrolledCourses: (data) => {
    return http.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`, data, {
      headers: {
        Authorization: `Bearer ${userLocal.accessToken}`,
      },
    });
  },
};
