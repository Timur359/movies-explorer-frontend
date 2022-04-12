import React from "react";
import Footer from "../Parts/Footer/Footer";
import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

const Main = () => (
  <div>
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
