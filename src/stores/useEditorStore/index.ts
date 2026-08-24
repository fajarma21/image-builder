import { create } from 'zustand';

import { TARGET_SELECTION } from '@/constants';
import { IDLE } from '@/constants/interaction';
import alignSelection from '@/utils/alignSelection';
import getCanvasBounds from '@/utils/getCanvasBounds';
import distributeSelection from '@/utils/distributeSelection';
import getSelectionBounds from '@/utils/getSelectionBounds';
import layerOrder from '@/utils/layerOrder';
import pushHistory from '@/utils/pushHistory';

import stopInteraction from './utils/stopInteraction';
import addShape from './utils/addShape';
import addImage from './utils/addImage';
import startInteraction from './utils/startInteraction';
import duplicate from './utils/duplicate';
import paste from './utils/paste';
import deleteSelected from './utils/deleteSelected';
import dragShapes from './utils/dragShapes';
import moveShapes from './utils/moveShapes';
import type { EditorStore } from './index.types';

const useEditorStore = create<EditorStore>((set) => ({
  document: {
    name: '',
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
  snapBounds: [],
  snapLine: null,
  updateDocument: (document) =>
    set((state) => ({ document: { ...state.document, ...document } })),
  addShape: (shape) =>
    set((state) => {
      const newShape = addShape(state, shape);
      return {
        ...pushHistory(state),
        ...newShape,
        selectionBounds: getSelectionBounds(
          newShape!.selectedIds,
          newShape!.shapesById,
        ),
      };
    }),
  addImage: (name, imageSrc, width, height) =>
    set((state) => {
      const newImage = addImage(state, name, imageSrc, width, height);
      return {
        ...pushHistory(state),
        ...newImage,
        selectionBounds: getSelectionBounds(
          newImage!.selectedIds,
          newImage!.shapesById,
        ),
      };
    }),
  selectOnly: (id) =>
    set((state) => ({
      selectedIds: [id],
      selectionBounds: getSelectionBounds([id], state.shapesById),
    })),
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
      return {
        ...pushHistory(state),
        ...deleteSelected(state),
        selectionBounds: null,
      };
    }),
  updateShape: (id, shape) =>
    set((state) => {
      return {
        shapesById: {
          ...state.shapesById,
          [id]: { ...state.shapesById![id], ...shape },
        },
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
          width,
          height,
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
  dragShapes: (shapes, dx, dy) =>
    set((state) => {
      const shapesById = dragShapes(shapes, dx, dy);
      return { shapesById: { ...state.shapesById, ...shapesById } };
    }),
  moveShapes: (ids, dx, dy) =>
    set((state) => {
      const shapesById = moveShapes(state, ids, dx, dy);

      return {
        ...pushHistory(state),
        shapesById: {
          ...state.shapesById,
          ...shapesById,
        },
        selectionBounds: getSelectionBounds(state.selectedIds, shapesById),
      };
    }),
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
  updateSnapLine: (h, v) =>
    set(() => ({
      snapLine: h === null && v === null ? null : { h, v },
    })),
}));

export default useEditorStore;
