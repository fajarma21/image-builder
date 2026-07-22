import type { EditorStore } from '@/stores/useEditorStore/index.types';
import type { Shape } from '@/types/shape';
import getSelectionBounds from '../getSelectionBounds';

const paste = (state: EditorStore) => {
  const { clipboard, shapeIds, shapesById } = state;
  if (!clipboard.length) return;

  const newIds = [];
  const newShapes: Record<string, Shape> = {};
  for (let index = 0; index < clipboard.length; index++) {
    const newId = String(Date.now() + index);
    const shape = clipboard[index];
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
    selectionBounds: getSelectionBounds(newIds, state.shapesById),
  };
};

export default paste;
