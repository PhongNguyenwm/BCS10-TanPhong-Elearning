import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../../components/Input/InputCustom";
import * as registerAnimation from "../../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userManagementServ } from "../../../services/userManagement";
import { NotifyContext } from "../../../template/AdminTemplate/AdminTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Select } from "antd";

const EditUser = () => {
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const [userTypes, setUserTypes] = useState([]);
  const { taiKhoan } = useParams();

  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const res = await userManagementServ.getUserTypes();
        setUserTypes(res.data);
      } catch (err) {
        console.log(err.data);
      }
    };
    fetchUserTypes();
  }, []);

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
      maLoai: "",
      email: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const data = {
          ...values,
          maNhom: "GP01",
          maLoaiNguoiDung: values.maLoai === "GV" ? "GV" : "HV",
        };
        const res = await userManagementServ.updateUser(data);
        console.log(res);
        notify("Sửa user thành công, trở về trang quản lí người dùng");
        setTimeout(() => {
          navigate("/admin/quan-li-nguoi-dung");
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          notify(error.response.data);
        }, 1000);
      }
    },
    validationSchema: Yup.object({
      hoTen: Yup.string().required("Vui lòng không bỏ trống"),
      taiKhoan: Yup.string()
        .matches(/^[^\W_]+$/, "Tài khoản không thể chứa ký tự đặc biệt")
        .required("Vui lòng không bỏ trống"),
      //   .min(6, "Vui lòng nhập tối thiểu 6 ký tự")
      //   .max(16, "vui lòng nhập tối đa 16 ký tự"),
      matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      //   .min(6, "Mật khẩu yêu cầu tối thiểu 6 ký tự")
      //   .max(15, "Mật khẩu chỉ gồm tối đa 15 ký tự")
      //   .matches(
      //     /.*[^\w\s].*/,
      //     "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
      //   ),

      email: Yup.string()
        .email("Vui lòng kiểm tra định dạng email")
        .required("Vui lòng nhập email"),
      soDt: Yup.string()
        .matches(
          /^(0[2|3|5|7|8|9])+([0-9]{8,10})$/,
          "Vui lòng nhập đúng số điện thoại"
        )
        .required("Vui lòng nhập số điện thoại"),
      maLoai: Yup.string().required("Vui lòng lựa chọn giá trị"),
    }),
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userManagementServ.getUserInfo(taiKhoan);
        const userData = res.data[0];
        console.log(userData);
        if (userData) {
          setFieldValue("taiKhoan", userData.taiKhoan);
          setFieldValue("matKhau", userData.matKhau);
          setFieldValue("hoTen", userData.hoTen);
          setFieldValue("soDt", userData.soDt);
          setFieldValue("email", userData.email);
          setFieldValue("maLoai", userData.maLoaiNguoiDung);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [taiKhoan]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container ">
      <h3 className=" text-black text-3xl">Sửa người dùng</h3>
      <div className="h-screen flex">
        <div className="animation_signIn w-7/12 flex items-center justify-center">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className="form_signIn w-5/12 flex items-center justify-center flex-col">
          <div className="w-full p-10 border border-gray-400 rounded-md space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
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
              <InputCustom
                placeholder="Mật khẩu *"
                id="matKhau"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.matKhau}
                touched={touched.matKhau}
                name="matKhau"
                value={values.matKhau}
                // className="pl-10 pr-16"
              />
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
              <Form.Item label="Chọn loại người dùng">
                <Select
                  id="maLoai"
                  name="maLoai"
                  onChange={(value) => {
                    setFieldValue("maLoai", value);
                    console.log("giá trị của mã loại", value);
                  }}
                  onBlur={handleBlur}
                  value={values.maLoai}
                  style={{
                    color:
                      userTypes.tenLoaiNguoiDung == "Giáo vụ" ? "red" : "green",
                  }}
                >
                  {userTypes.map((userType) => (
                    <Select.Option
                      style={{
                        color:
                          userType.maLoaiNguoiDung == "GV" ? "red" : "green",
                      }}
                      key={userType.maLoaiNguoiDung}
                      value={userType.maLoaiNguoiDung}
                    >
                      {userType.tenLoaiNguoiDung}
                    </Select.Option>
                  ))}
                </Select>
                {errors.maLoai && touched.maLoai ? (
                  <p className="text-red-500 text-sm">{errors.maLoai}</p>
                ) : null}
              </Form.Item>
              <div>
                <button
                  type="submit"
                  className="py-2 px-5 bg-yellow-300 hover:bg-yellow-400 text-black rounded-md w-full mt-2 text-base"
                >
                  Sửa người dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
