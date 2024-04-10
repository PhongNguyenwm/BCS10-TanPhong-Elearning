import React, { useContext } from "react";
import InputCustom from "../../components/Input/InputCustom";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import { saveLocalStorage } from "../../utils/util";
import { userManagementServ } from "../../services/userManagement";
const SignIn = () => {
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: async (values) => {
        try {
          const res = await userManagementServ.logIn(values);
          saveLocalStorage("user", res.data);
          notify(
            "Đăng nhập thành công, khách hàng sẽ được chuyển hướng về trang chủ"
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (error) {
          notify(error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng nhập mật khẩu"),
        matKhau: Yup.string().required("Vui lòng nhập mật khẩu"),
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
    <div className="h-screen flex">
      <div className="animation_signIn w-7/12 flex items-center justify-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="form_signIn w-5/12 flex items-center justify-center flex-col">
        <div className="p-10 border border-gray-400 rounded-md space-y-5">
          <h3 className="text-3xl">Đăng nhập</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputCustom
              placeholder="Vui lòng nhập tài khoản"
              id="taiKhoan"
              label="Tài khoản"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.taiKhoan}
              touched={touched.taiKhoan}
              name="taiKhoan"
              value={values.taiKhoan}
            />
            <InputCustom
              placeholder="Vui lòng nhập mật khẩu"
              id="matKhau"
              label="Mật khẩu"
              onChange={handleChange}
              type="password"
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
              name="matKhau"
              value={values.matKhau}
            />
            <div>
              <p>
                Chưa có tài khoản? bấm
                <NavLink to="/sign-up" className="mx-1 text-blue-500">
                  vào đây
                </NavLink>
                để đăng ký
              </p>
              <button
                type="submit"
                className="py-2 px-5  bg-yellow-300 hover:bg-yellow-400 text-black rounded-md w-full mt-2 "
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
