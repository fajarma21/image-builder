import isEmptyObject from '@/utils/isEmptyObject';
import type { EditorStore } from '../index.types';

const deleteSelected = (state: EditorStore) => {
  let cleanShapesById = state.shapesById;
  if (state.shapesById) {
    cleanShapesById = { ...state.shapesById };
    for (const id of state.selectedIds) {
      delete cleanShapesById[id];
    }
  }

  return {
    selectedIds: [],
    shapeIds: state.shapeIds.filter(
      (item) => !state.selectedIds.includes(item),
    ),
    shapesById: isEmptyObject(cleanShapesById) ? null : cleanShapesById,
  };
};

export default deleteSelected;
