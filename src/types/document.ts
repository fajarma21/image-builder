export interface Document {
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  grid: {
    show: boolean;
    horizontal: number;
    vertical: number;
    snap: boolean;
  };
}
