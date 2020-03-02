import React, { useState } from "react";

import SlideBtn from "./slideBtn";
import InfoBtn from "./InfoBtn";
import SlideMenu from "./slideMenu";
import InfoModal from "./InfoModal";
import "./slide.scss";

const Slide = () =>{
  const [openMenu, setOpenMenu] = useState(false);
  // const [openInfo, setOpenInfo] = useState(false);
  console.log(InfoModal)
  return (
    <div className={"slide-wrapper " + (openMenu ? "active" : "")}>
      {openMenu && <SlideMenu />}
      <div>
        <SlideBtn onClick={() => setOpenMenu(!openMenu)} />
        <InfoBtn onClick={InfoModal} />
      </div>
    </div>
  );
}

export default Slide;

