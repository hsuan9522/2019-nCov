import React from "react";
import { Modal } from "antd";

const InfoModal = () => {
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

export default InfoModal;