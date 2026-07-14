import {
  ORDER_BACKWARD,
  ORDER_FORWARD,
  ORDER_TO_BACK,
  ORDER_TO_FRONT,
} from '@/constants';

const moveShapeId = (shapeIds: string[], id: string, moveAmount: 1 | -1) => {
  const from = shapeIds.indexOf(id);
  const to = from + moveAmount;
  if (to < 0 || to > shapeIds.length - 1) return shapeIds;

  const copy = [...shapeIds];
  const [targetItem] = copy.splice(from, 1);
  copy.splice(to, 0, targetItem);

  return copy;
};

const layerOrder = (order: string, id: string, shapeIds: string[]) => {
  let newShapeIds = shapeIds;

  switch (order) {
    case ORDER_TO_FRONT:
      newShapeIds = [...shapeIds.filter((item) => item !== id), id];
      break;

    case ORDER_FORWARD:
      newShapeIds = moveShapeId(shapeIds, id, 1);
      break;

    case ORDER_TO_BACK:
      newShapeIds = [id, ...shapeIds.filter((item) => item !== id)];
      break;

    case ORDER_BACKWARD:
      newShapeIds = moveShapeId(shapeIds, id, -1);
      break;

    default:
      break;
  }

  return newShapeIds;
};

export default layerOrder;
