import React, { useEffect, useState } from "react";

const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const isTablet = width <= 900;
  const isDesktop = width > 1024;

  return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
