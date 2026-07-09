import type {
  AllInteractionTypes,
  EditorSnapshot,
  GenericInteractionTypes,
  InteractionState,
  Shape,
  ShapeType,
} from '@/types/shape';
import type {
  EDITING_TEXT,
  IDLE,
  MARQUEE,
  MOUSE_DOWN_SHAPE,
  MOUSE_DOWN_EMPTY,
  PANNING,
} from '@/constants/interaction';
import type { Camera } from '@/types';

interface IdleInteraction {
  type: typeof IDLE;
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

interface MarqueeInteraction {
  type: typeof MARQUEE;
  startMouseX: number;
  startMouseY: number;
  currentMouseX: number;
  currentMouseY: number;
}

interface GenericInteraction extends InteractionState {
  type: GenericInteractionTypes;
}

interface Document {
  width: number;
  height: number;
  backgroundColor: string;
}

export interface PushHistory extends EditorSnapshot {
  past: EditorStore['past'];
}

export interface EditorStore extends EditorSnapshot {
  camera: Camera;

  document: Document;

  interaction:
    | IdleInteraction
    | EditingTextInteraction
    | MouseDownShapeInteraction
    | MouseDownEmptyInteraction
    | GenericInteraction
    | PanningInteraction
    | MarqueeInteraction;

  past: EditorSnapshot[];
  future: EditorSnapshot[];
  clipboard: Shape[];

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
  updateSize: (id: string, width: number, height: number) => void;

  startInteraction: (
    interaction: AllInteractionTypes,
    mouseX: number,
    mouseY: number,
    shape?: Shape,
  ) => void;
  startEditingText: () => void;
  startPan: (
    startMouseX: number,
    startMouseY: number,
    scrollLeft: number,
    scrollTop: number,
  ) => void;
  stopInteraction: (e: globalThis.MouseEvent) => void;

  pushHistory: (snapshot: EditorSnapshot) => void;
  undo: () => void;
  redo: () => void;

  moveShape: (id: string, x: number, y: number) => void;

  duplicate: (ids: string[]) => void;
  copy: () => void;
  paste: () => void;

  bringToFront: (id: string) => void;
  bringForward: (id: string) => void;
  sendToBack: (id: string) => void;
  sendBackward: (id: string) => void;

  zooming: (zoom: number) => void;

  marquee: (newX: number, newY: number) => void;
}
