import { GraphData, GraphMetaData, MultiDateType } from "../types";
const DAY = 24 * 60 * 60 * 1e3;

// 将时间信息统一转换成对象
export const MultipleDate2Date = (date: MultiDateType) => {
  if (date instanceof Date) {
    return date;
  }
  try {
    const newDate = new Date(date);
    return newDate;
  } catch (error) {
    throw error;
  }
};

// 将时间信息 统一转换成string格式 ’y-m-d‘
export const MultipleDate2Str = (date: MultiDateType) => {
  if (typeof date === "string" || typeof date === "number") {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// 获取一年前的时间
export const oneYearAgo = (d: Date) => {
  const newD = new Date(d);
  newD.setFullYear(newD.getFullYear() - 1);
  return newD;
};

// 计算两个日期之间有多少天
export const diffDays = (d1: Date, d2: Date) => {
  const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.floor((date2.valueOf() - date1.valueOf()) / DAY);
};

export const diffWeeks = (d1: Date, d2: Date) => {
  const days = diffDays(d1, d2);
  return Math.abs(Math.floor(days / 7));
};
// 判断两个日期是否是同一天
export const isSameDay = (d1: MultiDateType, d2: MultiDateType) =>
  MultipleDate2Str(d1) === MultipleDate2Str(d2);

// 对数据进行补齐
export const fillData = (d: GraphMetaData[]) => {
  const newData: GraphData[] = [];
  const end = new Date();
  // end.setDate(end.getDate() );
  const start = oneYearAgo(end);
  // start.getDay() !== 0
  //   ? start.setDate(start.getDate() - (start.getDay() - 1))
  //   : start.setDate(start.getDate() - 6);
  const dayCount = diffDays(start, end);
  for (let i = 0; i <= dayCount; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const oldData = d.find((e) => isSameDay(e.date, date));
    if (oldData) {
      newData.push({ date, count: oldData.count });
    } else {
      newData.push({ date, count: 0 });
    }
  }
  return newData;
};

export const groupData = (d: GraphData[]) => {
  const groups: GraphData[][] = [[]];
  let groupIndex = 0;
  for (let i = 0; i < d.length; i++) {
    groups[groupIndex].push(d[i]);
    if (d[i].date.getDay() === 0) {
      groups.push([]);
      groupIndex++;
    }
  }
  return groups;
};

export const createColorMap = (
  range: [number, number],
  colors: string[],
  emptyColor: string
) => {
  const [min, max] = range.sort((a, b) => a - b);
  const r = max - min;
  const n = colors.length;
  const unit = Math.floor(r / n);

  const _ = (d: GraphData) => {
    if (d.count <= min) {
      return emptyColor;
    }
    let cIndex = Math.floor((d.count - min) / unit);
    return cIndex < n ? colors[cIndex] : colors[n - 1];
  };
  return _;
};
