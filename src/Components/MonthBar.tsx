import React from "react";
import { GraphData, Options } from "../types";
import { diffDays, diffWeeks } from "../utils";

const MonthBar = ({
  data,
  options,
}: {
  data: GraphData[];
  options: Options;
}) => {
  const {
    marginLeft: x0,
    marginTop: y0,
    weekBarWidth: xOffset,
    fontSize,
    fontColor,
    size,
    gap,
  } = options;
  const space = size + gap * 2;
  const Month = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const createMonthMap = (d: GraphData[]) => {
    let startDay = d[0].date;
    let s = new Date(startDay);
    let offset = 0;
    let sOffset = s.getDay() === 1 ? 0 : 1;

    const nextMonth = new Date(
      startDay.getFullYear(),
      startDay.getMonth() + 1,
      1
    );
    const monthMap: { month: number; xOffset: number }[] = [];
    if (diffDays(startDay, nextMonth) <= 14) {
      if (diffDays(startDay, nextMonth) >= 7) {
        offset = 2;
        sOffset = offset;
      }
      monthMap.push({ month: nextMonth.getMonth(), xOffset: sOffset });
      s = nextMonth;
    } else {
      monthMap.push({ month: startDay.getMonth(), xOffset: sOffset });
    }

    for (let i = 1; i < 12; i++) {
      const t = new Date(s);
      t.setMonth(s.getMonth() + i);
      t.setDate(1);
      let dw = diffWeeks(s, t);
      const td = t.getDay() === 0 ? 7 : t.getDay();
      const sd = s.getDay() === 0 ? 7 : s.getDay();
      dw += td < sd ? 1 : 0;
      monthMap.push({ month: t.getMonth(), xOffset: dw + offset });
    }
    return monthMap;
  };
  const monthMap = createMonthMap(data);

  return (
    <g>
      {monthMap.map((d) => {
        const x = x0 + space * d.xOffset + xOffset;
        return (
          <text y={y0} x={x} fill={fontColor} fontSize={fontSize}>
            {Month[d.month]}
          </text>
        );
      })}
    </g>
  );
};

export default MonthBar;
