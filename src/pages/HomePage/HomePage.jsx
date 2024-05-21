import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleTurnOnLoading,
  handleTurnOffLoading,
} from "../../redux/slice/loadingSlice";
import Loading from "../../components/Loading/Loading";
import Header from "../../layout/Header/Header";
import Banner from "../../layout/Banner/Banner";
import Information from "../../layout/Information/Information";
import PopularCourses from "../../layout/PopularCourses/PopularCourses";
import BoxNumber from "../../layout/BoxNumber/BoxNumber";
import TopInstructors from "../../layout/TopInstructors/TopInstructors";
import TeachingReview from "../../layout/TeachingReview/TeachingReview";
import Footer from "../../layout/Footer/Footer";
import BackToTop from "../../layout/BackToTop/BackToTop";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";

const HomePage = () => {
  const notify = useContext(NotifyContext);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  useEffect(() => {
    const loadData = async () => {
      dispatch(handleTurnOnLoading());
      try {
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } catch (error) {
        notify(error.response.data);
      } finally {
        dispatch(handleTurnOffLoading());
      }
    };

    loadData();
  }, [dispatch]);
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
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
        </>
      )}
      <div className="back-to-top-container">
        <BackToTop />
      </div>
    </div>
  );
};

export default HomePage;
