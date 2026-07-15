import type { EditorSnapshot, Shape, ShapeType } from '@/types/shape';
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
import type { Bounds, Camera } from '@/types';

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

interface Document {
  width: number;
  height: number;
  backgroundColor: string;
}

interface StartInteractionParams {
  type: AllInteractionTypes;
  mouseX?: number;
  mouseY?: number;
  scrollX?: number;
  scrollY?: number;
  shape?: Shape;
}

export interface EditorStore extends EditorSnapshot {
  camera: Camera;

  document: Document;

  interaction:
    | IdleInteraction
    | DraggingInteraction
    | ResizingInteraction
    | RotatingInteraction
    | EditingTextInteraction
    | MouseDownShapeInteraction
    | MouseDownEmptyInteraction
    | PanningInteraction
    | MarqueeInteraction;

  past: EditorSnapshot[];
  future: EditorSnapshot[];
  clipboard: Shape[];
  selectionBounds: Bounds | null;

  addShape: (shape: ShapeType) => void;
  addImage: (
    name: string,
    imageSrc: string,
    width: number,
    height: number,
  ) => void;
  selectOnly: (id: string) => void;
  selectMultiple: (ids: string[]) => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  selectAll: () => void;
  deleteSelected: () => void;
  updateShape: (id: string, shape: Partial<Shape>) => void;
  updateMultipleShape: (shapes: Record<string, Shape>) => void;
  updateSize: (id: string, width: number, height: number) => void;

  startInteraction: (data: StartInteractionParams) => void;
  stopInteraction: (e?: globalThis.MouseEvent) => void;

  pushHistory: (snapshot: EditorSnapshot) => void;
  undo: () => void;
  redo: () => void;

  moveShape: (id: string, x: number, y: number) => void;

  duplicate: (ids: string[]) => void;
  copy: () => void;
  paste: () => void;

  moveLayer: (order: string) => void;

  zooming: (zoom: number) => void;

  marquee: (newX: number, newY: number) => void;
  updateSelectionBounds: (selectionBounds: Bounds) => void;

  align: (alignment: string) => void;
  distribute: (distribution: string) => void;
}
