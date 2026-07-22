import type { EditorStore } from '@/stores/useEditorStore/index.types';
import type { Shape } from '@/types/shape';
import getSelectionBounds from '../getSelectionBounds';

const duplicate = (state: EditorStore, ids: string[]) => {
  const { shapesById, shapeIds } = state;

  const newIds = [];
  const newShapes: Record<string, Shape> = {};
  for (let index = 0; index < ids.length; index++) {
    const id = ids[index];
    const newId = String(Date.now() + index);
    const shape = structuredClone(shapesById![id]);
    newIds.push(newId);
    newShapes[newId] = {
      ...shape,
      id: newId,
      name: shape.name + ' copy',
    };
  }

  return {
    shapesById: {
      ...shapesById,
      ...newShapes,
    },
    shapeIds: [...shapeIds, ...newIds],
    selectedIds: newIds,
    selectionBounds: getSelectionBounds(newIds, shapesById),
  };
};

export default duplicate;
