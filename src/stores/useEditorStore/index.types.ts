import type { EditorSnapshot, Shape, ShapeType } from '@/types/shape';
import type { Bounds, Camera } from '@/types';
import type { interaction, StartInteractionParams } from '@/types/interaction';

interface Document {
  width: number;
  height: number;
  backgroundColor: string;
}

export interface EditorStore extends EditorSnapshot {
  camera: Camera;

  document: Document;

  interaction: interaction;

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

  align: (alignment: string) => void;
  distribute: (distribution: string) => void;
}
