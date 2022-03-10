import React from "react";
import { useState } from "react";
import Days from "./Components/Days";
import MonthBar from "./Components/MonthBar";
import Tooltip from "./Components/Tooltip";

import WeekBar from "./Components/WeekBar";
import {
  defaultColors,
  defaultEmptyColor,
  defaultFontColor,
  defaultFontSize,
  defaultGap,
  defaultMarginLeft,
  defaultMarginTop,
  defaultMonthBarHeight,
  defaultRadius,
  defaultRange,
  defaultSize,
  defualtWeekBarWidth,
} from "./const";
import { GraphData, GraphMetaData } from "./types";
import { createColorMap, fillData, groupData } from "./utils";

const ContributeGraph = ({
  data,
  size = defaultSize,
  gap = defaultGap,
  monthBarHeight = defaultMonthBarHeight,
  weekBarWidth = defualtWeekBarWidth,
  marginLeft = defaultMarginLeft,
  marginTop = defaultMarginTop,
  fontSize = defaultFontSize,
  fontColor = defaultFontColor,
  radius = defaultRadius,
  emptyColor = defaultEmptyColor,
  tipFormatter,
  colors = defaultColors,
  range = defaultRange,
}: {
  data: GraphMetaData[];
  size?: number;
  gap?: number;
  monthBarHeight?: number;
  weekBarWidth?: number;
  marginLeft?: number;
  marginTop?: number;
  fontSize?: number;
  fontColor?: string;
  radius?: number;
  tipFormatter?: (d: GraphData) => JSX.Element;
  emptyColor?: string;
  colors?: string[] | ((d: GraphData) => string);
  range?: [number, number];
}) => {
  const d = fillData(data);
  const g = groupData(d);
  const options = {
    size,
    gap,
    monthBarHeight,
    weekBarWidth,
    marginLeft,
    marginTop,
    fontSize,
    fontColor,
    radius,
  };
  const svgWidth =
    (d.length / 7) * (size + 2 * gap) + weekBarWidth + marginLeft + fontSize;
  const svgHeight = 7 * (size + 2 * gap) + monthBarHeight + marginTop;

  const [position, setPositon] = useState([0, 0]);
  const [tipData, setTipData] = useState(d[0]);
  const [isShow, setIsShow] = useState(false);

  const handleSVGHover = (e: any) => {
    const { target } = e;
    const x = parseInt(target.getAttribute("x"));
    const y = parseInt(target.getAttribute("y"));
    const d: GraphData = target.dataset;
    setPositon([x, y]);
    setTipData(d);
    setIsShow(true);
  };

  const colorMap =
    typeof colors === "function"
      ? colors
      : createColorMap(range, colors, emptyColor);

  return (
    <div style={{ position: "relative" }}>
      <svg width={svgWidth} height={svgHeight}>
        <MonthBar data={d} options={options} />
        <Days
          data={g}
          options={{ ...options, colorMap }}
          onMouseOver={handleSVGHover}
          onMouseLeave={() => {
            setIsShow(false);
          }}
        />
        <WeekBar options={options} />
      </svg>
      <Tooltip
        isShow={isShow}
        position={position}
        d={tipData}
        options={{ ...options, svgWidth, svgHeight, tipFormatter }}
      />
    </div>
  );
};

export default ContributeGraph;
