import { getLocalStorage } from "../utils/util";
import { http } from "./config";

export const coursesManagementServ = {
  getCoureCatalogs: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
  getCourseList: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
  },
  addCourse: (formData) => {
    const userLocal = getLocalStorage("user");
    return http.post("/QuanLyKhoaHoc/ThemKhoaHoc", formData, {
      headers: {
        Authorization: `bearer ${userLocal.accessToken}`,
      },
    });
  },
};
