export type MultiDateType = Date | string | number;
export interface GraphMetaData {
  date: MultiDateType;
  count: number;
}

export interface GraphData {
  date: Date;
  count: number;
}

export interface Options {
  size: number;
  gap: number;
  monthBarHeight: number;
  weekBarWidth: number;
  marginLeft: number;
  marginTop: number;
  fontSize: number;
  fontColor: string;
  radius: number;
}
