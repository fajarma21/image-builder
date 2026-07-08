import { create } from 'zustand';

import { SHAPE_IMAGE, SHAPE_TEXT } from '@/constants';
import {
  EDITING_TEXT,
  IDLE,
  MOUSE_DOWN,
  PANNING,
} from '@/constants/interaction';

import { DEFAULT_GENERIC_SHAPE, DEFAULT_TEXT_SHAPE } from './index.constants';
import type { EditorStore } from './index.types';
import { createSnapshot, moveShapeId, pushHistory } from './index.helpers';
import isEmptyObject from '@/utils/isEmptyObject';
import type { Shape } from '@/types/shape';

const useEditorStore = create<EditorStore>((set) => ({
  document: {
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
  },
  camera: {
    zoom: 1,
  },
  shapesById: null,
  shapeIds: [],
  selectedId: null,
  selectedIds: [],
  interaction: { type: IDLE },
  past: [],
  future: [],
  clipboard: [],
  addShape: (shape) =>
    set((state) => {
      const id = Date.now().toString();
      const len = state.shapeIds.length;
      const defaultShape =
        shape === SHAPE_TEXT ? DEFAULT_TEXT_SHAPE : DEFAULT_GENERIC_SHAPE;
      const name = `${shape}${len ? ` ${len + 1}` : ''}`;

      return {
        ...pushHistory(state),
        shapesById: {
          ...state.shapesById,
          [id]: {
            id,
            type: shape,
            name,
            ...defaultShape,
          },
        },
        shapeIds: [...state.shapeIds, id],
        selectedId: id,
        selectedIds: [id],
      };
    }),
  addImage: (name, imageSrc, width, height) =>
    set((state) => {
      const id = Date.now().toString();

      return {
        ...pushHistory(state),
        shapesById: {
          ...state.shapesById,
          [id]: {
            id,
            type: SHAPE_IMAGE,
            name,
            imageSrc,
            ...DEFAULT_GENERIC_SHAPE,
            width,
            height,
          },
        },
        shapeIds: [...state.shapeIds, id],
        selectedId: id,
        selectedIds: [id],
      };
    }),
  selectOnly: (id) => set(() => ({ selectedIds: [id] })),
  toggleSelection: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((item) => item !== id)
        : [...state.selectedIds, id],
    })),
  selectAll: () => set((state) => ({ selectedIds: state.shapeIds })),
  clearSelection: () => set(() => ({ selectedIds: [] })),
  deleteSelected: () =>
    set((state) => {
      let cleanShapesById = state.shapesById;
      if (state.shapesById) {
        cleanShapesById = { ...state.shapesById };
        for (const id of state.selectedIds) {
          delete cleanShapesById[id];
        }
      }

      return {
        ...pushHistory(state),
        selectedIds: [],
        shapeIds: state.shapeIds.filter(
          (item) => !state.selectedIds.includes(item),
        ),
        shapesById: isEmptyObject(cleanShapesById) ? null : cleanShapesById,
      };
    }),
  updateShape: (id, shape) =>
    set((state) => {
      if (state.shapesById && state.shapesById[id])
        return {
          shapesById: {
            ...state.shapesById,
            [id]: { ...state.shapesById[id], ...shape },
          },
        };
      return {
        shapesById: state.shapesById,
      };
    }),
  updateSize: (id, width, height) =>
    set((state) => ({
      shapesById: {
        ...state.shapesById,
        [id]: {
          ...state.shapesById![id],
          width: Math.max(state.shapesById![id].width, width),
          height: Math.max(state.shapesById![id].height, height),
        },
      },
    })),
  startInteraction: (type, mouseX, mouseY, shape) =>
    set((state) => ({
      interaction: {
        type,
        startMouseX: mouseX,
        startMouseY: mouseY,
        scrollLeft: 0,
        scrollTop: 0,
        startShapes: state.selectedIds.map((id) => state.shapesById![id]),
        centerX: shape ? shape.x + shape.width / 2 : 0,
        centerY: shape ? shape.y + shape.height / 2 : 0,
        startSnapshot: createSnapshot(state),
      },
    })),
  startEditingText: () => set(() => ({ interaction: { type: EDITING_TEXT } })),
  startPan: (startMouseX, startMouseY, scrollLeft, scrollTop) =>
    set(() => ({
      interaction: {
        type: PANNING,
        startMouseX,
        startMouseY,
        scrollLeft,
        scrollTop,
      },
    })),
  stopInteraction: (e) =>
    set((state) => {
      if (
        state.interaction.type === IDLE ||
        state.interaction.type === EDITING_TEXT
      )
        return state;

      let history: ReturnType<typeof pushHistory> | null = null;
      const startState = state.interaction;
      if (
        (e.clientX !== startState.startMouseX ||
          e.clientY !== startState.startMouseY) &&
        state.interaction.type !== MOUSE_DOWN &&
        state.interaction.type !== PANNING
      ) {
        history = pushHistory({
          ...state.interaction.startSnapshot,
          past: state.past,
        });
      }

      return { ...history, interaction: { type: IDLE } };
    }),
  pushHistory: (snapshot) =>
    set((state) => {
      return {
        past: [...state.past, snapshot],
        future: [],
      };
    }),
  undo: () =>
    set((state) => {
      if (!state.past.length) return state;

      const lastPast = state.past[state.past.length - 1];
      return {
        ...lastPast,
        past: state.past.slice(0, -1),
        future: [...state.future, state],
      };
    }),
  redo: () =>
    set((state) => {
      if (!state.future.length) return state;

      const lastFuture = state.future[state.future.length - 1];
      return {
        ...lastFuture,
        past: [...state.past, state],
        future: state.future.slice(0, -1),
      };
    }),
  moveShape: (id, x = 0, y = 0) => {
    set((state) => {
      const current = state.shapesById![id];
      return {
        ...pushHistory(state),
        shapesById: {
          ...state.shapesById,
          [id]: {
            ...current,
            x: current.x + x,
            y: current.y + y,
          },
        },
      };
    });
  },
  duplicate: (ids) =>
    set((state) => {
      const newIds = [];
      const newShapes: Record<string, Shape> = {};
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const newId = String(Date.now() + index);
        const shape = structuredClone(state.shapesById![id]);
        newIds.push(newId);
        newShapes[newId] = {
          ...shape,
          id: newId,
          name: shape.name + ' copy',
        };
      }

      return {
        ...pushHistory(state),
        shapesById: {
          ...state.shapesById,
          ...newShapes,
        },
        shapeIds: [...state.shapeIds, ...newIds],
        selectedIds: newIds,
      };
    }),
  copy: () =>
    set((state) => ({
      ...state,
      clipboard: state.selectedIds.map((id) =>
        structuredClone(state.shapesById![id]),
      ),
    })),
  paste: () =>
    set((state) => {
      if (!state.clipboard.length) return state;

      const newIds = [];
      const newShapes: Record<string, Shape> = {};
      for (let index = 0; index < state.clipboard.length; index++) {
        const newId = String(Date.now() + index);
        const shape = state.clipboard[index];
        newIds.push(newId);
        newShapes[newId] = {
          ...shape,
          id: newId,
          name: shape.name + ' copy',
        };
      }

      return {
        ...pushHistory(state),
        shapesById: {
          ...state.shapesById,
          ...newShapes,
        },
        shapeIds: [...state.shapeIds, ...newIds],
        selectedIds: newIds,
      };
    }),
  bringToFront: (id) =>
    set((state) => {
      return {
        ...pushHistory(state),
        shapeIds: [...state.shapeIds.filter((item) => item !== id), id],
      };
    }),
  bringForward: (id) =>
    set((state) => {
      return {
        ...pushHistory(state),
        shapeIds: moveShapeId(state.shapeIds, id, 1),
      };
    }),
  sendToBack: (id) =>
    set((state) => {
      return {
        ...pushHistory(state),
        shapeIds: [id, ...state.shapeIds.filter((item) => item !== id)],
      };
    }),
  sendBackward: (id) =>
    set((state) => {
      return {
        ...pushHistory(state),
        shapeIds: moveShapeId(state.shapeIds, id, -1),
      };
    }),
  zooming: (zoom) =>
    set((state) => ({
      camera: {
        ...state.camera,
        zoom,
      },
    })),
}));

export default useEditorStore;
