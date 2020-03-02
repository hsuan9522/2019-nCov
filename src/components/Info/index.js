import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import _ from "loadsh";
import { List, Spin, Icon } from "antd";
import { tify } from "chinese-conv";

import GlobalStatic from "./globalStatic";

import "./globalInfo.scss";

const Info = () => {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  const totalData = useSelector(state => state.totalData);
  const [virusInfo, setVirusInfo] = useState([]);

  const getVirusInfo = () =>{
    axios
      .get("https://lab.isaaclin.cn/nCoV/api/overall")
      .then(res => {
        const data = res.data.results[0];
        let note = [];
        if (!_.isEmpty(data)) {
          for (let i = 0; i < 3; i++) {
            note.push(data[`remark${i + 1}`]);
          }
          for (let i = 0; i < 3; i++) {
            note.push(data[`note${i + 1}`]);
          }
        }
        setVirusInfo(note);
      })
      .catch(err => console.log("info err"));
  }

  useEffect(()=>{
    getVirusInfo();
  },[])

  return (
    <div>
      <GlobalStatic data={totalData} />
      {virusInfo.length > 0 ? (
        <List
          style={{ marginTop: "10px" }}
          size="small"
          header={<div>Note</div>}
          bordered
          dataSource={virusInfo}
          renderItem={(item, i) => (
            <List.Item key={i}>{tify(item)}</List.Item>
          )}
        />
      ) : (
          <div className="loading">
            <Spin indicator={antIcon} />
          </div>
        )}
    </div>
  )
}

export default Info;