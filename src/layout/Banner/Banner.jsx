import React, { useState, useEffect } from "react";
import "../Banner/Banner.scss";
import { useSpring, animated } from "react-spring";
import Lottie from "react-lottie";

import * as registerAnimation from "./../../assets/animation/banner.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: registerAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Banner() {
  const [show, setShow] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCharIndex((prevIndex) => prevIndex + 1);
    }, 200); // Thời gian delay giữa các ký tự

    // Reset charIndex khi đã hiển thị hết tất cả các ký tự
    if (charIndex === "V learning".split("").length) {
      clearTimeout(timer);
      setShow(true);

      // Đặt charIndex về 0 sau khoảng thời gian chờ 5s
      setTimeout(() => {
        setCharIndex(0);
        setShow(false);
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [charIndex]);

  return (
    <div className="banner container" style={{ marginTop: 100 }}>
      <div className="grid grid-cols-12 justify-center">
        <div className="banner_content col-span-6">
          <div>
            <img
              className="img_item"
              src="https://demo2.cybersoft.edu.vn/static/media/paper_plane.93dfdbf5.png"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-5">Chào mừng</h1>
            <h1 className="text-5xl font-bold mb-5"> đến với môi trường </h1>
            <div className="learning-animation text-5xl font-bold mb-5 text-green-700 ">
              <>
                {["E", ..."-learning"]
                  .slice(0, charIndex)
                  .map((char, index) => (
                    <AnimatedChar
                      key={index}
                      char={char}
                      index={index}
                      style={
                        char === "E"
                          ? { fontSize: "50px", marginRight: "3px" }
                          : { fontSize: "45px", marginRight: "3px" }
                      }
                    />
                  ))}
              </>
            </div>
            <button className="btn_content">BẮT ĐẦU NÀO</button>
          </div>
        </div>
        <div className="col-span-6">
          <div className="animation_content">
            <Lottie options={defaultOptions} height={400} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component con để hiển thị từng ký tự
const AnimatedChar = ({ char, index, style }) => {
  const animationProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 100 },
    delay: 500 + index * 300, // Tăng độ trễ cho mỗi chữ cái
  });

  return (
    <animated.span style={{ ...style, ...animationProps }}>
      {char}
    </animated.span>
  );
};
