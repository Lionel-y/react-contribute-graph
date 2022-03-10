import React from "react";
import ReactDOM from "react-dom";
import { getRandData } from "../mock/index";
import ContributeGraph from "./ContributeGraph";
import { GraphData } from "./types";
import { MultipleDate2Str } from "./utils";
import { defaultColors } from "./const";

const data = getRandData(10);
const tipFormatter = (d: GraphData) => {
  return (
    <div>
      <strong>{d.count} 次提交</strong>
      {MultipleDate2Str(d.date)}
    </div>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <ContributeGraph
      data={data}
      tipFormatter={tipFormatter}
      range={[0, 60]}
      colors={defaultColors}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
