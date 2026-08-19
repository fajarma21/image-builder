import type { EditorStore } from '../index.types';

const moveShapes = (
  state: EditorStore,
  ids: string[],
  dx: number,
  dy: number,
) => {
  const shapesById = ids.reduce((prev, curr) => {
    const shape = state.shapesById![curr];
    return {
      ...prev,
      [curr]: {
        ...shape,
        x: shape.x + dx,
        y: shape.y + dy,
      },
    };
  }, {});

  return shapesById;
};

export default moveShapes;
