import React from "react";
import Lottie from "react-lottie";
import * as buidingAnimation from "../../assets/animation/buidingpage.json";

const BuidingPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: buidingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="flex flex-col content-center justify-center my-5">
      <div className="mb-5">
        <h1 className="text-3xl font-bold bg-yellow-400 text-center py-5">
          Chức năng đang xây dựng vui lòng trở lại sau
        </h1>
      </div>
      <div className="mb-5">
        <Lottie options={defaultOptions} height={500} width={"80%"} />
      </div>
      <div className="text-center">
        <button
          onClick={handleGoBack}
          className="text-gray-800  bg-yellow-300 hover:bg-yellow-400  font-sans rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default BuidingPage;
