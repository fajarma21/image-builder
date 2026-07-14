import type { PushHistoryParams } from './index.types';

const pushHistory = ({
  past,
  shapesById,
  shapeIds,
  selectedIds,
}: PushHistoryParams) => {
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

export default pushHistory;
