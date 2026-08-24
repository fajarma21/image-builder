import type { EditorSnapshot } from '@/types/shape';

const createSnapshot = (state: EditorSnapshot) => {
  return {
    shapesById: structuredClone(state.shapesById),
    shapeIds: state.shapeIds,
    selectedIds: state.selectedIds,
    selectionBounds: state.selectionBounds,
    snapBounds: state.snapBounds,
  };
};

export default createSnapshot;
