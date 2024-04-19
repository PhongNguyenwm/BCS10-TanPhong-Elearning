import React from "react";

const InputCustom = ({
  id,
  label,
  placeholder,
  className = "",
  name,
  onChange,
  value,
  onBlur,
  error,
  touched,
  readOnly,
  type = "text",
  fieldValue,
}) => {
  // id, label, placeholder sẽ khác nhau giữa các input

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-base font-sans text-gray-900"
      >
        {label}
      </label>
      <input
        onBlur={onBlur}
        value={fieldValue !== undefined ? fieldValue : value}
        onChange={onChange}
        type={type}
        name={name}
        readOnly={readOnly ? true : false}
        id={id}
        className={`bg-gray-50 min-w-sm border border-black text-gray-700 text-base font-sans rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ${className} ${
          error && touched ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
      />
      {error && touched ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : null}
    </div>
  );
};

export default InputCustom;
