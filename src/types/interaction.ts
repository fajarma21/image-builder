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

interface DraggingInteraction {
  type: typeof DRAGGING;
  startMouseX: number;
  startMouseY: number;
  startShapes: Shape[];
  centerX: number;
  centerY: number;
  startSnapshot: EditorSnapshot;
}

interface ResizingInteraction {
  type: typeof RESIZING;
  startMouseX: number;
  startMouseY: number;
  startShapes: Shape[];
  centerX: number;
  centerY: number;
  startSnapshot: EditorSnapshot;
}

interface RotatingInteraction {
  type: typeof ROTATING;
  startMouseX: number;
  startMouseY: number;
  startShapes: Shape[];
  centerX: number;
  centerY: number;
  startSnapshot: EditorSnapshot;
}

interface MouseDownShapeInteraction {
  type: typeof MOUSE_DOWN_SHAPE;
  startMouseX: number;
  startMouseY: number;
}

interface MouseDownEmptyInteraction {
  type: typeof MOUSE_DOWN_EMPTY;
  startMouseX: number;
  startMouseY: number;
}

interface EditingTextInteraction {
  type: typeof EDITING_TEXT;
}

interface PanningInteraction {
  type: typeof PANNING;
  startMouseX: number;
  startMouseY: number;
  scrollLeft: number;
  scrollTop: number;
}

interface MarqueeInteraction {
  type: typeof MARQUEE;
  startMouseX: number;
  startMouseY: number;
  currentMouseX: number;
  currentMouseY: number;
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
