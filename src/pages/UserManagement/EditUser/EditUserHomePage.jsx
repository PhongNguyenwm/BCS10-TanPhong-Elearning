import React, { useContext, useEffect } from "react";
import InputCustom from "../../../components/Input/InputCustom";
import * as registerAnimation from "../../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userManagementServ } from "../../../services/userManagement";
import { NotifyContext } from "../../../template/UserTemplate/UserTemplate";
import { useNavigate, useParams } from "react-router-dom";
import useResponsive from "../../../hooks/useResponsive";

const EditUserHomePage = () => {
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const { taiKhoan } = useParams();
  const { isDesktop, isTablet, isMobile } = useResponsive();

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDt: "",
      maLoaiNguoiDung: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const data = {
          ...values,
          maNhom: "GP01",
        };
        await userManagementServ.updateUser(data);
        notify("Cập nhật thông tin thành công! Vui lòng đăng nhập lại");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        notify("Cập nhật thông tin thất bại, vui lòng thử lại sau");
        setTimeout(() => {}, 1000);
      }
    },
    validationSchema: Yup.object({
      hoTen: Yup.string().required("Vui lòng không bỏ trống"),
      taiKhoan: Yup.string()
        .matches(/^[^\W_]+$/, "Tài khoản không thể chứa ký tự đặc biệt")
        .required("Vui lòng không bỏ trống"),
      matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      email: Yup.string()
        .email("Vui lòng kiểm tra định dạng email")
        .required("Vui lòng nhập email"),
      soDt: Yup.string()
        .matches(
          /^(0[2|3|5|7|8|9])+([0-9]{8,10})$/,
          "Vui lòng nhập đúng số điện thoại"
        )
        .required("Vui lòng nhập số điện thoại"),
      //   maLoai: Yup.string().required("Vui lòng lựa chọn giá trị"),
    }),
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userManagementServ.getUserInfo(taiKhoan);
        const userData = res.data[0];
        if (userData) {
          setFieldValue("taiKhoan", userData.taiKhoan);
          setFieldValue("matKhau", userData.matKhau);
          setFieldValue("hoTen", userData.hoTen);
          setFieldValue("soDt", userData.soDt);
          setFieldValue("email", userData.email);
          setFieldValue("maLoaiNguoiDung", userData.maLoaiNguoiDung);
        }
      } catch (err) {
        notify(err.response.data);
      }
    };
    fetchUser();
  }, [taiKhoan, notify, setFieldValue]);

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
        <div className="container mb-5 ">
          <div className="mb-5">
            <h3 className=" text-black text-3xl mb-5 ">
              Chỉnh sửa thông tin cá nhân
            </h3>
          </div>
          <div className="h-screen flex my-10">
            <div className="animation_signIn w-5/12 flex items-center justify-center">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
            <div className="form_signIn w-7/12 flex items-center justify-center flex-col">
              <div className="w-full p-10 border border-gray-400 rounded-md space-y-5">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <InputCustom
                    placeholder="Tài khoản"
                    id="taiKhoan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.taiKhoan}
                    touched={touched.taiKhoan}
                    name="taiKhoan"
                    value={values.taiKhoan}
                    readOnly={true}
                    label={"Tài khoản"}
                  />
                  <InputCustom
                    placeholder="Mật khẩu"
                    id="matKhau"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.matKhau}
                    touched={touched.matKhau}
                    name="matKhau"
                    value={values.matKhau}
                    label={"Mật khẩu"}
                  />
                  <InputCustom
                    placeholder="Họ tên"
                    id="hoTen"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.hoTen}
                    touched={touched.hoTen}
                    name="hoTen"
                    value={values.hoTen}
                    label={"Họ tên"}
                  />
                  <InputCustom
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    error={errors.email}
                    touched={touched.email}
                    name="email"
                    value={values.email}
                    label={"Email"}
                  />

                  <InputCustom
                    placeholder="Số điện thoại"
                    id="soDt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.soDt}
                    touched={touched.soDt}
                    name="soDt"
                    value={values.soDt}
                    label={"Số điện thoại"}
                  />
                  <InputCustom
                    placeholder="Mã người dùng"
                    id="maLoaiNguoiDung"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.maLoaiNguoiDung}
                    touched={touched.maLoaiNguoiDung}
                    name="maLoaiNguoiDung"
                    value={values.maLoaiNguoiDung}
                    label={"Mã người dùng"}
                    readOnly={true}
                  />

                  <div className="text-center">
                    <button
                      type="submit"
                      className="py-2 px-8 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md mt-2 text-base"
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isTablet && (
        <div className="container ">
          <h3 className=" text-black text-3xl mb-3 ">
            Chỉnh sửa thông tin cá nhân
          </h3>
          <div className="h-screen flex">
            <div className="animation_signIn w-5/12 flex items-center justify-center">
              <Lottie options={defaultOptions} height={200} width={200} />
            </div>
            <div className="form_signIn w-7/12 flex items-center justify-center flex-col">
              <div className="w-full p-10 border border-gray-400 rounded-md space-y-5">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <InputCustom
                    placeholder="Tài khoản"
                    id="taiKhoan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.taiKhoan}
                    touched={touched.taiKhoan}
                    name="taiKhoan"
                    value={values.taiKhoan}
                    readOnly={true}
                    label={"Tài khoản"}
                  />
                  <InputCustom
                    placeholder="Mật khẩu"
                    id="matKhau"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.matKhau}
                    touched={touched.matKhau}
                    name="matKhau"
                    value={values.matKhau}
                    label={"Mật khẩu"}
                  />
                  <InputCustom
                    placeholder="Họ tên"
                    id="hoTen"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.hoTen}
                    touched={touched.hoTen}
                    name="hoTen"
                    value={values.hoTen}
                    label={"Họ tên"}
                  />
                  <InputCustom
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    error={errors.email}
                    touched={touched.email}
                    name="email"
                    value={values.email}
                    label={"Email"}
                  />

                  <InputCustom
                    placeholder="Số điện thoại"
                    id="soDt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.soDt}
                    touched={touched.soDt}
                    name="soDt"
                    value={values.soDt}
                    label={"Số điện thoại"}
                  />
                  <InputCustom
                    placeholder="Mã người dùng"
                    id="maLoaiNguoiDung"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.maLoaiNguoiDung}
                    touched={touched.maLoaiNguoiDung}
                    name="maLoaiNguoiDung"
                    value={values.maLoaiNguoiDung}
                    label={"Mã người dùng"}
                    readOnly={true}
                  />

                  <div className="text-center">
                    <button
                      type="submit"
                      className="py-2 px-8 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md mt-2 text-base"
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="container ">
          <h3 className=" text-black text-2xl mb-3">
            Chỉnh sửa thông tin cá nhân
          </h3>

          <div className="h-screen flex justify-center items-center">
            <div className="form_signIn w-full flex items-center justify-center flex-col">
              <div className="w-full p-10 border border-gray-400 rounded-md space-y-5">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <InputCustom
                    placeholder="Tài khoản"
                    id="taiKhoan"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.taiKhoan}
                    touched={touched.taiKhoan}
                    name="taiKhoan"
                    value={values.taiKhoan}
                    readOnly={true}
                    label={"Tài khoản"}
                  />
                  <InputCustom
                    placeholder="Mật khẩu"
                    id="matKhau"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.matKhau}
                    touched={touched.matKhau}
                    name="matKhau"
                    value={values.matKhau}
                    label={"Mật khẩu"}
                  />
                  <InputCustom
                    placeholder="Họ tên"
                    id="hoTen"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.hoTen}
                    touched={touched.hoTen}
                    name="hoTen"
                    value={values.hoTen}
                    label={"Họ tên"}
                  />
                  <InputCustom
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    error={errors.email}
                    touched={touched.email}
                    name="email"
                    value={values.email}
                    label={"Email"}
                  />

                  <InputCustom
                    placeholder="Số điện thoại"
                    id="soDt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.soDt}
                    touched={touched.soDt}
                    name="soDt"
                    value={values.soDt}
                    label={"Số điện thoại"}
                  />
                  <InputCustom
                    placeholder="Mã người dùng"
                    id="maLoaiNguoiDung"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.maLoaiNguoiDung}
                    touched={touched.maLoaiNguoiDung}
                    name="maLoaiNguoiDung"
                    value={values.maLoaiNguoiDung}
                    label={"Mã người dùng"}
                    readOnly={true}
                  />

                  <div className="text-center">
                    <button
                      type="submit"
                      className="py-2 px-8 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md mt-2 text-base"
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserHomePage;
