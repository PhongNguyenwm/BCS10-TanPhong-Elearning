import React from "react";
import Header from "../../layout/Header/Header";
import Banner from "../../layout/Banner/Banner";
import Information from "../../layout/Information/Information";
import PopularCourses from "../../layout/PopularCourses/PopularCourses";
import BoxNumber from "../../layout/BoxNumber/BoxNumber";
import TopInstructors from "../../layout/TopInstructors/TopInstructors";
import TeachingReview from "../../layout/TeachingReview/TeachingReview";
import Footer from "../../layout/Footer/Footer";
import BackToTop from "../../layout/BackToTop/BackToTop";

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
      {/* BoxNumber */}
      <BoxNumber />
      {/* Top instructors */}
      <TopInstructors />
      {/* TeachingReview  */}
      <TeachingReview />
      {/* Footer  */}
      <Footer />
      {/* BackToTop */}
      <div className="back-to-top-container">
        <BackToTop />
      </div>
    </div>
  );
};

export default HomePage;
