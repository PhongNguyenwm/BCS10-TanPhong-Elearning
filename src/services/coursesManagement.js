import { http } from "./config";

export const coursesManagementServ = {
  getCoureCatalogs: () => {
    return http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },
};
