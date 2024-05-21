import React, { useContext, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import * as registerAnimation from "./../../assets/animation/register.json";
import bgHoaTiet from "../../assets/img/bgHoaTiet.jpg";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { userManagementServ } from "../../services/userManagement";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";

import useResponsive from "../../hooks/useResponsive";
const SignUp = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showPassword, setShowPassword] = useState(false);
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        hoTen: "",
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
      },
      onSubmit: async (values) => {
        values.maNhom = "GP01";
        try {
          await userManagementServ.signUp(values);
          notify("Đăng ký thành công, vui lòng đăng nhập để tiếp tục");
          setTimeout(() => {
            navigate("/sign-in");
          }, 1000);
        } catch (error) {
          notify(error.response.data);
        }
      },
      validationSchema: Yup.object({
        hoTen: Yup.string().required("Vui lòng nhập họ và tên"),
        taiKhoan: Yup.string()
          .matches(/^[^\W_]+$/, "Tài khoản không thể chứa ký tự đặc biệt")
          .required("Vui lòng nhập tài khoản")
          .min(6, "Vui lòng nhập tối thiểu 6 ký tự")
          .max(16, "vui lòng nhập tối đa 16 ký tự"),
        matKhau: Yup.string()
          .required("Vui lòng nhập mật khẩu")
          .min(6, "Mật khẩu yêu cầu tối thiểu 6 ký tự")
          .max(15, "Mật khẩu chỉ gồm tối đa 15 ký tự")
          .matches(
            /.*[^\w\s].*/,
            "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
          ),

        email: Yup.string()
          .email("Vui lòng kiểm tra định dạng email")
          .required("Vui lòng nhập email"),
        soDt: Yup.string()
          .matches(
            /^(0[2|3|5|7|8|9])+([0-9]{8,10})$/,
            "Vui lòng nhập đúng số điện thoại"
          )
          .required("Vui lòng nhập số điện thoại"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      {isDesktop && (
        <div
          className="h-screen flex"
          style={{
            backgroundImage: `url(${bgHoaTiet})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          <div className="animation_signIn w-5/12 flex items-center justify-center">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>

          <div className="form_signIn w-7/12 flex items-center justify-center flex-col ">
            <h1 className="flex items-center justify-center text-black text-xl font-semibold mb-5	">
              Đăng ký thành viên
            </h1>
            <form onSubmit={handleSubmit} className="space-y-8 w-4/5">
              <InputCustom
                placeholder="Họ tên *"
                id="hoTen"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.hoTen}
                touched={touched.hoTen}
                name="hoTen"
                value={values.hoTen}
              />
              <InputCustom
                placeholder="Tài khoản *"
                id="taiKhoan"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.taiKhoan}
                touched={touched.taiKhoan}
                name="taiKhoan"
                value={values.taiKhoan}
              />
              <div className="relative">
                <InputCustom
                  placeholder="Mật khẩu *"
                  id="matKhau"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  error={errors.matKhau}
                  touched={touched.matKhau}
                  name="matKhau"
                  value={values.matKhau}
                />
                <div
                  className={`absolute top-1/2 right-2 transform flex items-center ${
                    errors.matKhau && touched.matKhau
                      ? "-translate-y-5"
                      : "-translate-y-1/3"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  >
                    {showPassword ? (
                      <i className="fas fa-eye text-gray-500"></i>
                    ) : (
                      <i className="fas fa-eye-slash text-gray-500"></i>
                    )}
                  </button>
                </div>
              </div>
              <InputCustom
                placeholder="Email *"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                error={errors.email}
                touched={touched.email}
                name="email"
                value={values.email}
              />

              <InputCustom
                placeholder="Số điện thoại *"
                id="soDt"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.soDt}
                touched={touched.soDt}
                name="soDt"
                value={values.soDt}
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-5 bg-yellow-400 text-black rounded-md  hover:bg-yellow-500"
                >
                  Đăng ký
                </button>
              </div>
              <p className={`text-end`}>
                Đã có tài khoản?
                <NavLink to="/sign-in" className="mx-1 text-blue-500 ">
                  Đăng nhập
                </NavLink>
                ngay
              </p>
            </form>
          </div>
        </div>
      )}
      {isTablet && (
        <div
          className="h-screen flex"
          style={{
            backgroundImage: `url(${bgHoaTiet})`,
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        >
          <div className="animation_signIn w-5/12 flex items-center justify-center">
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>

          <div className="form_signIn w-7/12 flex items-center justify-center flex-col ">
            <h1 className="flex items-center justify-center text-black text-xl font-semibold mb-5	">
              Đăng ký thành viên
            </h1>
            <form onSubmit={handleSubmit} className="space-y-10 w-4/5">
              <InputCustom
                placeholder="Họ tên *"
                id="hoTen"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.hoTen}
                touched={touched.hoTen}
                name="hoTen"
                value={values.hoTen}
              />
              <InputCustom
                placeholder="Tài khoản *"
                id="taiKhoan"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.taiKhoan}
                touched={touched.taiKhoan}
                name="taiKhoan"
                value={values.taiKhoan}
              />
              <div className="relative">
                <InputCustom
                  placeholder="Mật khẩu *"
                  id="matKhau"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  error={errors.matKhau}
                  touched={touched.matKhau}
                  name="matKhau"
                  value={values.matKhau}
                />
                <div
                  className={`absolute top-1/2 right-2 transform flex items-center ${
                    errors.matKhau && touched.matKhau
                      ? "-translate-y-5"
                      : "-translate-y-1/3"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  >
                    {showPassword ? (
                      <i className="fas fa-eye text-gray-500"></i>
                    ) : (
                      <i className="fas fa-eye-slash text-gray-500"></i>
                    )}
                  </button>
                </div>
              </div>
              <InputCustom
                placeholder="Email *"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                error={errors.email}
                touched={touched.email}
                name="email"
                value={values.email}
              />

              <InputCustom
                placeholder="Số điện thoại *"
                id="soDt"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.soDt}
                touched={touched.soDt}
                name="soDt"
                value={values.soDt}
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="py-2 px-5 bg-yellow-400 text-black rounded-md  hover:bg-yellow-500"
                >
                  Đăng ký
                </button>
              </div>
              <p className={`text-end`}>
                Đã có tài khoản?
                <NavLink to="/sign-in" className="mx-1 text-blue-500 ">
                  Đăng nhập
                </NavLink>
                ngay
              </p>
            </form>
          </div>
        </div>
      )}
      {isMobile && (
        <div
          className="h-screen flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${bgHoaTiet})`,
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        >
          <h1 className="flex items-center justify-center text-black text-xl font-semibold mb-5	">
            Đăng ký thành viên
          </h1>
          <form onSubmit={handleSubmit} className="space-y-10 w-4/5">
            <InputCustom
              placeholder="Họ tên *"
              id="hoTen"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.hoTen}
              touched={touched.hoTen}
              name="hoTen"
              value={values.hoTen}
            />
            <InputCustom
              placeholder="Tài khoản *"
              id="taiKhoan"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.taiKhoan}
              touched={touched.taiKhoan}
              name="taiKhoan"
              value={values.taiKhoan}
            />
            <div className="relative">
              <InputCustom
                placeholder="Mật khẩu *"
                id="matKhau"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                error={errors.matKhau}
                touched={touched.matKhau}
                name="matKhau"
                value={values.matKhau}
              />
              <div
                className={`absolute top-1/2 right-2 transform flex items-center ${
                  errors.matKhau && touched.matKhau
                    ? "-translate-y-5"
                    : "-translate-y-1/3"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-2"
                >
                  {showPassword ? (
                    <i className="fas fa-eye text-gray-500"></i>
                  ) : (
                    <i className="fas fa-eye-slash text-gray-500"></i>
                  )}
                </button>
              </div>
            </div>
            <InputCustom
              placeholder="Email *"
              id="email"
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              error={errors.email}
              touched={touched.email}
              name="email"
              value={values.email}
            />

            <InputCustom
              placeholder="Số điện thoại *"
              id="soDt"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.soDt}
              touched={touched.soDt}
              name="soDt"
              value={values.soDt}
            />
            <div className="text-center">
              <button
                type="submit"
                className="py-2 px-5 bg-yellow-400 text-black rounded-md  hover:bg-yellow-500"
              >
                Đăng ký
              </button>
            </div>
            <p className="text-center bg-yellow-400 text-black rounded">
              Đã có tài khoản?
              <NavLink to="/sign-in" className="mx-1 text-blue-500 ">
                Đăng nhập
              </NavLink>
              ngay
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
