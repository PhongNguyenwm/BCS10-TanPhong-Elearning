import React from "react";
import Lottie from "react-lottie";
import * as loadingAnimation from "../../assets/animation/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="h-screen w-full bg-slate-100 flex items-center justify-center fixed top-0 left-0"
      style={{ zIndex: 9999 }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
