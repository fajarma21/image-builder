import type { Bounds, Camera } from '@/types';
import type { EditorSnapshot, Shape, ShapeType } from '@/types/shape';
import type { Document } from '@/types/document';
import type { interaction, StartInteractionParams } from '@/types/interaction';

export interface EditorStore extends EditorSnapshot {
  camera: Camera;

  document: Document;

  interaction: interaction;

  past: EditorSnapshot[];
  future: EditorSnapshot[];
  clipboard: Shape[];
  selectionBounds: Bounds | null;

  updateDocument: (document: Partial<Document>) => void;

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

  align: (alignment: string, target: string) => void;
  distribute: (distribution: string, target: string) => void;
}
