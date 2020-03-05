import React, { useState } from "react";
import { Modal } from "antd";

import SlideBtn from "./slideBtn";
import InfoBtn from "./infoBtn";
import MapBtn from "./mapBtn";
import SlideMenu from "./slideMenu";
import Map from "./map";
import "./slide.scss";

const Slide = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  function InfoModal() {
    Modal.info({
      title: "About This Website",
      content: (
        <div>
          <p>這是一個react的練習專案，API是從下方的資料來源所寫的網站內找出來的，我不確定這樣的合法性，但我僅是練習，並無任何商業用途。</p>
        </div>
      ),
      onOk() { },
    })
  }

  return (
    <div>
      {openMap && <Map />}
      <div className={"slide-wrapper " + (openMenu ? "active" : "")}>
        {openMenu && <SlideMenu />}
        <div>
          <SlideBtn onClick={() => setOpenMenu(!openMenu)} />
          <MapBtn onClick={()=> setOpenMap(!openMap)}/>
          <InfoBtn onClick={InfoModal} />
        </div>
      </div>
    </div>
  );
}

export default Slide;

