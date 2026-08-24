export interface Document {
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  grid: {
    show: boolean;
    horizontal: number;
    vertical: number;
  };
  snap: {
    object: boolean;
    canvas: boolean;
  };
}

export interface SnapLine {
  h: number | null;
  v: number | null;
}
