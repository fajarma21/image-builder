import type { EditorSnapshot } from '@/types/shape';
import type { EditorStore, PushHistory } from './index.types';

export const getFirstPosition = (
  state: EditorStore,
  width: number,
  height: number,
) => {
  return {
    x: state.settings.width / 2 - width / 2,
    y: state.settings.height / 2 - height / 2,
  };
};

export const moveShapeId = (
  shapeIds: string[],
  id: string,
  moveAmount: 1 | -1,
) => {
  const from = shapeIds.indexOf(id);
  const to = from + moveAmount;
  if (to < 0 || to > shapeIds.length - 1) return shapeIds;

  const copy = [...shapeIds];
  const [targetItem] = copy.splice(from, 1);
  copy.splice(to, 0, targetItem);

  return copy;
};

export const createSnapshot = (state: EditorSnapshot) => {
  return {
    shapesById: structuredClone(state.shapesById),
    shapeIds: state.shapeIds,
    selectedIds: state.selectedIds,
  };
};

export const pushHistory = ({
  past,
  shapesById,
  shapeIds,
  selectedIds,
}: PushHistory) => {
  const snapShot = {
    shapesById: structuredClone(shapesById),
    shapeIds,
    selectedIds,
  };
  return {
    past: [...past, snapShot],
    future: [],
  };
};
