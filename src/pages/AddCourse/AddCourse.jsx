import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { DatePicker, Switch, Rate, Button, Select, Radio } from "antd";
import { useFormik } from "formik";
import { coursesManagementServ } from "../../services/coursesManagement";
import moment from "moment";
import * as Yup from "yup";
import "./addcourse.scss";
import { NotifyContext } from "../../template/AdminTemplate/AdminTemplate";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/util";

const AddCourse = () => {
  const navigate = useNavigate();
  const notify = useContext(NotifyContext);
  const [image, setImage] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  useEffect(() => {
    async function fetchCourseCatagories() {
      try {
        const res = await coursesManagementServ.getCoureCatalogs();
        setCourseCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCourseCatagories();
  }, []);

  const userLocal = getLocalStorage("user");
  const disableDate = (current) => {
    const today = moment().subtract(1, "days");
    return current && current < today;
  };

  // chuyển đổi hình ảnh thành chuỗi base64
  // const imageToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     if (!(file instanceof Blob)) {
  //       reject(new Error("File is not of type 'Blob'"));
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resolve(reader.result.split(",")[1]);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "hinhAnh" && files.length > 0) {
      const file = files[0];

      try {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.log(err);
      }
    } else {
      // Kiểm tra nếu tên trường là "taiKhoanNguoiTao" thì sử dụng userLocal.hoTen, ngược lại sử dụng giá trị từ trường input
      const fieldValue =
        name === "taiKhoanNguoiTao" ? userLocal.hoTen : e.target.value;
      // Cập nhật giá trị của trường tương ứng trong formik
      setFieldValue(name, fieldValue);
    }
  };

  const {
    handleSubmit,
    handleBlur,
    values,
    setFieldValue,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "GP01",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: "",
    },
    onSubmit: async (values) => {
      try {
        values.taiKhoanNguoiTao = userLocal.taiKhoan;
        values.maNhom = "GP01";
        values.luotXem = parseInt(values.luotXem);
        const base64String = image;
        values.hinhAnh = base64String;
        values.biDanh = values.tenKhoaHoc.toLowerCase().replace(/\s+/g, "-");
        console.log(values);

        const res = await coursesManagementServ.addCourse();
        // notify(
        //   "thêm khoá học thành công! chuyển hướng về trang quản lý khoá học"
        // );
        // resetForm();
        // setTimeout(() => {
        //   navigate("/admin/quan-li-khoa-hoc");
        // }, 1000);
        console.log(res);
      } catch (error) {
        console.log(error);
        // notify(error.respone.data.content);
      }
    },
    validationSchema: Yup.object({
      maKhoaHoc: Yup.string().required("Vui lòng không bỏ trống"),
      tenKhoaHoc: Yup.string().required("Vui lòng không bỏ trống"),
      moTa: Yup.string().required("Vui lòng không bỏ trống"),
      luotXem: Yup.string().required("Vui lòng không bỏ trống"),
      ngayTao: Yup.string().required("Vui lòng không bỏ trống"),
      maDanhMucKhoaHoc: Yup.string().required(
        "Vui lòng chọn danh mục khoá học"
      ),
    }),
  });
  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <div>
      <h3 className="text-4xl mb-5">Thêm khoá học mới</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-5">
          <div className="take-pic flex-col w-6/12 ">
            <label className="font-sans text-base mb-5" htmlFor="">
              Hình ảnh
            </label>
            <br />
            <input
              name="hinhAnh"
              className="mb-5 mt-2 font-sans text-base"
              onChange={handleChange}
              type="file"
            />
            {image && (
              <div className="relative">
                <img className="w-2/3" src={image} alt="" />
                <button
                  className="absolute font-black text-5xl top-0 right-28 mt-2 mr-2 text-red-500"
                  onClick={() => {
                    setImage(null);
                    setFieldValue("hinhAnh", "");
                    document.querySelector('input[type="file"]').value = null;
                  }}
                >
                  <i class="fa-sharp fa-regular fa-trash-can"></i>
                </button>
              </div>
            )}
          </div>

          <div className="container flex-wrap justify-content-center w-6/12">
            <div className="w-3/4 mb-5 ">
              <InputCustom
                name="maKhoaHoc"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maKhoaHoc}
                error={errors.maKhoaHoc}
                touched={touched.maKhoaHoc}
                label="Mã khoá học"
                placeholder="Nhập mã khoá học"
              />
            </div>
            <div className="w-3/4 mb-5 ">
              <InputCustom
                name="tenKhoaHoc"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tenKhoaHoc}
                error={errors.tenKhoaHoc}
                touched={touched.tenKhoaHoc}
                label="Tên khoá học"
                placeholder="Nhập tên khoá học"
              />
            </div>
            <div className="w-3/4 mb-5 ">
              <InputCustom
                name="taiKhoanNguoiTao"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.taiKhoanNguoiTao}
                error={errors.taiKhoanNguoiTao}
                touched={touched.taiKhoanNguoiTao}
                label="Người tạo"
                fieldValue={userLocal.hoTen}
              />
            </div>

            <div className="w-3/4 mb-5 ">
              <label
                htmlFor="maDanhMucKhoaHoc"
                className="block mb-2 text-base font-sans text-gray-700"
              >
                Danh mục khoá học
              </label>
              <Select
                className="mt-1 block w-full bg-gray-50"
                size="large"
                id="maDanhMucKhoaHoc"
                name="maDanhMucKhoaHoc"
                onChange={(value) => setFieldValue("maDanhMucKhoaHoc", value)}
                onBlur={handleBlur}
                value={values.maDanhMucKhoaHoc}
              >
                {courseCategories.map((category) => (
                  <Select.Option
                    key={category.maDanhMuc}
                    value={category.maDanhMuc}
                  >
                    {category.tenDanhMuc}
                  </Select.Option>
                ))}
              </Select>
              {touched.maDanhMucKhoaHoc && errors.maDanhMucKhoaHoc && (
                <p className="text-red-500 text-sm">
                  {errors.maDanhMucKhoaHoc}
                </p>
              )}
            </div>

            <div className="w-3/4 mb-5  ">
              <label
                className="mb-2 text-base font-sans text-gray-700"
                htmlFor=""
              >
                Chọn ngày tạo
              </label>
              <br />
              <DatePicker
                className="text-base font-sans"
                size="large"
                name="ngayTao"
                onBlur={handleBlur}
                value={
                  values.ngayTao ? moment(values.ngayTao, "DD-MM-YYYY") : null
                }
                disabledDate={disableDate}
                onChange={(datejs, dateString) => {
                  setFieldValue("ngayTao", dateString);
                }}
                format="DD-MM-YYYY"
              />
              {touched.ngayTao && errors.ngayTao ? (
                <p className="text-red-500 text-sm">{errors.ngayTao}</p>
              ) : null}
            </div>
            <div className="w-3/4 mb-5 ">
              <InputCustom
                name="luotXem"
                style={{ width: "300px" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.luotXem}
                error={errors.luotXem}
                touched={touched.luotXem}
                label="Lượt xem"
                placeholder="Nhập số lượt xem"
              />
            </div>
            <div className="w-3/4 mb-5  ">
              <label
                className="mb-2 text-base font-sans text-gray-700"
                htmlFor=""
              >
                Đánh giá
              </label>
              <br />
              <Rate
                onChange={(value) => {
                  setFieldValue("danhGia", value);
                }}
                value={values.danhGia}
                // allowHalf
              />
            </div>
          </div>
        </div>

        <div className="flex mb-5">
          <textarea
            name="moTa"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.moTa}
            className="border rounded font-sans text-base p-2 w-full"
            placeholder="Nhập mô tả"
          />
        </div>
        {touched.moTa && errors.moTa && (
          <p className="text-red-500 text-sm">{errors.moTa}</p>
        )}

        <div style={{ display: "grid", placeItems: "center" }}>
          <button
            // onClick={() => {
            //   notify("Thêm phim thành công!");
            // }}
            className="px-3 py-4 border text-base font-sans rounded text-black bg-yellow-300 hover:bg-yellow-400"
            type="submit"
          >
            Thêm khoá học
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
