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
  MOUSE_DOWN,
  PANNING,
} from '@/constants/interaction';

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

interface MouseDownInteraction {
  type: typeof MOUSE_DOWN;
  startMouseX: number;
  startMouseY: number;
}

interface GenericInteraction extends InteractionState {
  type: GenericInteractionTypes;
}

export interface Camera {
  zoom: number;
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
    | MouseDownInteraction
    | GenericInteraction
    | PanningInteraction;

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
}
