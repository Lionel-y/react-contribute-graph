import React from "react";
import { Options } from "../types";

const WeekBar = ({ options }: { options: Options }) => {
  const weeks = ["周一", "周四", "周日"];
  const {
    marginLeft: x0,
    marginTop: y0,
    monthBarHeight: yOffset,
    fontSize,
    fontColor,
    size,
    gap,
  } = options;
  const space = size + gap * 2;
  return (
    <g>
      {weeks.map((item, i) => {
        const y = y0 + yOffset + 3 * space * i + fontSize;
        return (
          <text x={x0} y={y} fontSize={fontSize} fill={fontColor}>
            {item}
          </text>
        );
      })}
    </g>
  );
};

export default WeekBar;
