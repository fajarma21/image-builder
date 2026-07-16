import {
  SHAPE_IMAGE,
  type SHAPE_ELLIPSE,
  type SHAPE_RECT,
  type SHAPE_TEXT,
} from '@/constants';

export type SupportedSVG =
  | SVGRectElement
  | SVGEllipseElement
  | SVGTextElement
  | SVGImageElement;

export type ShapeType =
  | typeof SHAPE_RECT
  | typeof SHAPE_ELLIPSE
  | typeof SHAPE_TEXT
  | typeof SHAPE_IMAGE;

export interface Shape {
  id: string;
  type: ShapeType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  text?: string;
  fontSize?: string;
  fontFamily?: string;
  imageSrc?: string;
}

export interface EditorSnapshot {
  shapesById: Record<string, Shape> | null;
  shapeIds: string[];
  selectedIds: string[];
}
