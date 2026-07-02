import {
  SHAPE_IMAGE,
  type SHAPE_ELLIPSE,
  type SHAPE_RECT,
  type SHAPE_TEXT,
} from '@/constants';
import {
  DRAGGING,
  RESIZING,
  type IDLE,
  type MOUSE_DOWN,
  type ROTATING,
} from '@/constants/interaction';

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
  imageSrc?: string;
}

export interface EditorSnapshot {
  shapesById: Record<string, Shape> | null;
  shapeIds: string[];
  selectedIds: string[];
}

export type GenericInteractionTypes =
  | typeof DRAGGING
  | typeof RESIZING
  | typeof ROTATING;
export type AllInteractionTypes =
  | typeof IDLE
  | typeof MOUSE_DOWN
  | GenericInteractionTypes;

export interface InteractionState {
  startMouseX: number;
  startMouseY: number;
  startShapes: Shape[];
  centerX: number;
  centerY: number;
  startSnapshot: EditorSnapshot;
}
