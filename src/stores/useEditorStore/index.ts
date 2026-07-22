import { create } from 'zustand';

import { TARGET_SELECTION } from '@/constants';
import { IDLE } from '@/constants/interaction';
import alignSelection from '@/utils/alignSelection';
import getCanvasBounds from '@/utils/getCanvasBounds';
import distributeSelection from '@/utils/distributeSelection';
import getSelectionBounds from '@/utils/getSelectionBounds';
import isEmptyObject from '@/utils/isEmptyObject';
import layerOrder from '@/utils/layerOrder';
import pushHistory from '@/utils/pushHistory';
import stopInteraction from '@/utils/Editor/stopInteraction';
import addShape from '@/utils/Editor/addShape';
import addImage from '@/utils/Editor/addImage';
import startInteraction from '@/utils/Editor/startInteraction';
import duplicate from '@/utils/Editor/duplicate';
import paste from '@/utils/Editor/paste';

import type { EditorStore } from './index.types';

const useEditorStore = create<EditorStore>((set) => ({
  document: {
    name: 'untitled project',
    width: 800,
    height: 600,
    backgroundColor: 'none',
    grid: {
      show: false,
      horizontal: 100,
      vertical: 100,
      snap: false,
    },
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
  selectionBounds: null,
  updateDocument: (document) =>
    set((state) => ({ document: { ...state.document, ...document } })),
  addShape: (shape) =>
    set((state) => ({
      ...pushHistory(state),
      ...addShape(state, shape),
    })),
  addImage: (name, imageSrc, width, height) =>
    set((state) => ({
      ...pushHistory(state),
      ...addImage(state, name, imageSrc, width, height),
    })),
  selectOnly: (id) => set(() => ({ selectedIds: [id], selectionBounds: null })),
  selectMultiple: (ids) =>
    set((state) => ({
      selectedIds: ids,
      selectionBounds: getSelectionBounds(ids, state.shapesById),
    })),
  toggleSelection: (id) =>
    set((state) => {
      const selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter((item) => item !== id)
        : [...state.selectedIds, id];
      return {
        selectedIds,
        selectionBounds: getSelectionBounds(selectedIds, state.shapesById),
      };
    }),
  selectAll: () =>
    set((state) => {
      const selectedIds = state.shapeIds.filter(
        (item) => state.shapesById![item].show,
      );
      return {
        selectedIds,
        selectionBounds: getSelectionBounds(selectedIds, state.shapesById),
      };
    }),
  clearSelection: () => set(() => ({ selectedIds: [], selectionBounds: null })),
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
        selectionBounds: null,
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
  updateMultipleShape: (shapes) =>
    set((state) => ({
      shapesById: { ...state.shapesById, ...shapes },
    })),
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
  startInteraction: (data) => set((state) => startInteraction(state, data)),
  stopInteraction: (e) =>
    set((state) => ({
      ...stopInteraction(state, e),
      interaction: { type: IDLE },
    })),
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
    set((state) => ({
      ...pushHistory(state),
      ...duplicate(state, ids),
    })),
  copy: () =>
    set((state) => ({
      clipboard: state.selectedIds.map((id) =>
        structuredClone(state.shapesById![id]),
      ),
    })),
  paste: () =>
    set((state) => ({
      ...pushHistory(state),
      ...paste(state),
    })),
  moveLayer: (order) =>
    set((state) => ({
      ...pushHistory(state),
      shapeIds: layerOrder(order, state.selectedIds[0], state.shapeIds),
    })),
  zooming: (zoom) =>
    set((state) => ({
      camera: {
        ...state.camera,
        zoom,
      },
    })),
  marquee: (newX, newY) =>
    set((state) => ({
      interaction: {
        ...state.interaction,
        currentMouseX: newX,
        currentMouseY: newY,
      },
    })),
  align: (alignment, target) =>
    set((state) => {
      const shapesById = {
        ...state.shapesById,
        ...alignSelection(
          alignment,
          state.selectedIds,
          state.shapesById,
          target === TARGET_SELECTION
            ? state.selectionBounds
            : getCanvasBounds(state.document),
        ),
      };
      return {
        ...pushHistory(state),
        shapesById,
        selectionBounds: getSelectionBounds(state.selectedIds, shapesById),
      };
    }),
  distribute: (distribution, target) =>
    set((state) => {
      const shapesById = {
        ...state.shapesById,
        ...distributeSelection(
          distribution,
          state.selectedIds,
          state.shapesById,
          target === TARGET_SELECTION
            ? state.selectionBounds
            : getCanvasBounds(state.document),
        ),
      };
      return {
        ...pushHistory(state),
        shapesById,
        selectionBounds: getSelectionBounds(state.selectedIds, shapesById),
      };
    }),
}));

export default useEditorStore;
