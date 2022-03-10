const DAY = 24 * 3600 * 1000;
function diffDays(a: Date, b: Date) {
  const date1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const date2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((date2 - date1) / DAY);
}
const formatterDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m}-${d}`;
};

function randCount() {
  return Math.floor(Math.random() * 50);
}
function randDay(d: Date) {
  const m = Math.floor(1 + Math.random() * 364);
  const randD = new Date(d);
  randD.setDate(randD.getDate() - m);
  return randD;
}
export function getData() {
  const datas: { date: string; count: number }[] = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const days = diffDays(oneYearAgo, today);
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    datas.push({
      date: formatterDate(date),
      count: randCount(),
    });
  }
  return datas;
}

export function getRandData(n: number) {
  const today = new Date();
  const data: { date: Date; count: number }[] = [];
  data.push({ date: today, count: randCount() });
  for (let i = 0; i < n - 1; i++) {
    data.push({
      date: randDay(today),
      count: randCount(),
    });
  }
  return data;
}
