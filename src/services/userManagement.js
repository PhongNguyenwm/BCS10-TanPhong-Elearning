import { http } from "./config";

export const userManagementServ = {
  logIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
};
