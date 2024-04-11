import React from "react";
import Header from "../../layout/Header/Header";
import Banner from "../../layout/Banner/Banner";
import Information from "../../layout/Information/Information";
import PopularCourses from "../../layout/PopularCourses/PopularCourses";

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Banner */}

      <Banner />

      {/* {Information} */}
      <Information />
      {/* {PopularCourses} */}
      <PopularCourses />
    </div>
  );
};

export default HomePage;
