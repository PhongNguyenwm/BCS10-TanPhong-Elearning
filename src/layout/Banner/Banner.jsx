import React, { useState, useEffect } from "react";
import "../Banner/Banner.scss";
import { useSpring, animated } from "react-spring";
import Lottie from "react-lottie";

import * as registerAnimation from "./../../assets/animation/banner.json";
import { NavLink } from "react-router-dom";

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
    }, 200);

    if (!show && charIndex === "V learning".split("").length) {
      clearTimeout(timer);
      setShow(true);

      setTimeout(() => {
        setCharIndex(0);
        setShow(false);
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [charIndex, show]);

  return (
    <div className="banner container" style={{ marginTop: 100 }}>
      <div className="grid grid-cols-12 justify-center">
        <div className="banner_content col-span-6">
          <div className="img_item">
            <img
              className=" img_item container"
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
            <NavLink className="btnGlobal1" to={`/khoahoc`}>
              Bắt Đầu Nào
            </NavLink>
          </div>
        </div>
        <div className="col-span-6">
          <div className="animation_content">
            <Lottie options={defaultOptions} height="100%" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}

const AnimatedChar = ({ char, index, style }) => {
  const animationProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 100 },
    delay: 500 + index * 300,
  });

  return (
    <animated.span style={{ ...style, ...animationProps }}>
      {char}
    </animated.span>
  );
};
