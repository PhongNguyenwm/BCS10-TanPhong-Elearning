import { http } from "./config";

export const coursesManagementServ = {
  getCoureCatalogs: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getCourseList: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
  },
};
