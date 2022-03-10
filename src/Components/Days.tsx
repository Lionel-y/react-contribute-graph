import React from "react";
import { GraphData, Options } from "../types";
import "./style.css";
const Days = ({
  data,
  options,
  onMouseOver,
  onMouseLeave,
}: {
  data: GraphData[][];
  options: Options & { colorMap: (d: GraphData) => string };
  onMouseOver: any;
  onMouseLeave: any;
}) => {
  const {
    size,
    gap,
    radius,
    marginLeft: x0,
    marginTop: y0,
    weekBarWidth: xOffset,
    monthBarHeight: yOffset,
    colorMap,
  } = options;
  const space = size + gap * 2;
  return (
    <g>
      {data.map((g, i) => {
        const x = x0 + xOffset + space * i;
        return g.map((d) => {
          // 所有day 减一对7求模
          const day = d.date.getDay() - 1;
          const yIndex = ((day % 7) + 7) % 7;
          const y = y0 + yOffset + space * yIndex;
          return (
            <rect
              x={x}
              y={y}
              width={size}
              height={size}
              fill={colorMap(d)}
              rx={radius}
              className="rect"
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
              data-date={d.date}
              data-count={d.count}
            ></rect>
          );
        });
      })}
    </g>
  );
};

export default Days;
