import React from "react";
import Footer from "../Parts/Footer/Footer";
import Header from "../Parts/Header/Header";
import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import HeaderMain from "./HeaderMain/HeaderMain";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

const Main = ({ isLoggedIn }) => (
  <div>
    {isLoggedIn ? <Header active={true} /> : <HeaderMain />}
    <Promo />
    <AboutProject />
    <Techs />
    <AboutMe>
      <Portfolio />
    </AboutMe>
    <Footer />
  </div>
);

export default Main;
