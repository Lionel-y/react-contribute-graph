import React from "react";
import { GraphData, Options } from "../types";
import { MultipleDate2Str } from "../utils";
import "./style.css";
const Tooltip = ({
  options,
  position,
  d,
  isShow,
}: {
  options: Options & {
    svgWidth: number;
    svgHeight: number;
    tipFormatter?: (d: GraphData) => JSX.Element;
  };
  position: number[];
  d: GraphData;
  isShow: boolean;
}) => {
  const {
    size,
    gap,
    svgWidth: width,
    svgHeight: height,
    tipFormatter,
  } = options;

  const space = size + gap * 2;
  let x = position[0] + size / 2;
  const y = position[1] - 8;

  // 判断tooltip是否超出边界，默认设置tooltip大约长度为154
  let xOffset = "-50%";
  if (x < 154 / 2) {
    xOffset = `-${space * 2}px`;
  } else if (width - x < 154 / 2) {
    xOffset = `-100% + ${2 * space}px`;
  }
  return (
    <div
      className="location-wrap"
      style={{ width: width, height: height, left: 0, top: 0 }}
    >
      <div
        className="toolTip"
        style={{
          left: x,
          top: y,
          visibility: isShow ? "visible" : "hidden",
          "--xOffset": xOffset,
        }}
      >
        {typeof tipFormatter === "function" ? (
          tipFormatter(d)
        ) : (
          <>
            <strong>{d.count}篇文章 </strong>
            <span>{MultipleDate2Str(d.date)}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
