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
  const loadingStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    transition: "opacity 0.8s ease-in-out",
  };
  return (
    <div style={loadingStyle}>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loading;
