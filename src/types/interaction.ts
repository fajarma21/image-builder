import type {
  EDITING_TEXT,
  IDLE,
  MARQUEE,
  MOUSE_DOWN_SHAPE,
  MOUSE_DOWN_EMPTY,
  PANNING,
  DRAGGING,
  RESIZING,
  ROTATING,
} from '@/constants/interaction';
import type { EditorSnapshot, Shape } from './shape';
import type { Point } from '.';

type AllInteractionTypes =
  | typeof IDLE
  | typeof MOUSE_DOWN_SHAPE
  | typeof MOUSE_DOWN_EMPTY
  | typeof DRAGGING
  | typeof RESIZING
  | typeof ROTATING
  | typeof EDITING_TEXT
  | typeof PANNING
  | typeof MARQUEE;

export interface StartInteractionParams {
  type: AllInteractionTypes;
  mouseX?: number;
  mouseY?: number;
  scrollX?: number;
  scrollY?: number;
  shape?: Shape;
}

interface IdleInteraction {
  type: typeof IDLE;
}

export interface DraggingInteraction {
  type: typeof DRAGGING;
  startMouse: Point;
  startShapes: Shape[];
  center: Point;
  startSnapshot: EditorSnapshot;
}

export interface ResizingInteraction {
  type: typeof RESIZING;
  startMouse: Point;
  startShapes: Shape[];
  center: Point;
  startSnapshot: EditorSnapshot;
}

export interface RotatingInteraction {
  type: typeof ROTATING;
  startMouse: Point;
  startShapes: Shape[];
  center: Point;
  startSnapshot: EditorSnapshot;
}

export interface MouseDownShapeInteraction {
  type: typeof MOUSE_DOWN_SHAPE;
  startMouse: Point;
}

export interface MouseDownEmptyInteraction {
  type: typeof MOUSE_DOWN_EMPTY;
  startMouse: Point;
}

interface EditingTextInteraction {
  type: typeof EDITING_TEXT;
}

export interface PanningInteraction {
  type: typeof PANNING;
  startMouse: Point;
  scrollLeft: number;
  scrollTop: number;
}

interface MarqueeInteraction {
  type: typeof MARQUEE;
  startMouse: Point;
  currentMouse: Point;
}

export type Interaction =
  | IdleInteraction
  | DraggingInteraction
  | ResizingInteraction
  | RotatingInteraction
  | EditingTextInteraction
  | MouseDownShapeInteraction
  | MouseDownEmptyInteraction
  | PanningInteraction
  | MarqueeInteraction;
