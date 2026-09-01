import type { ResizingInteraction } from '@/types/interaction';
import getDeltaAxis from '@/utils/getDeltaAxis';

const getResizeValue = (
  e: MouseEvent,
  interaction: ResizingInteraction,
  zoom: number,
) => {
  const currentMouse = { x: e.clientX, y: e.clientY };
  const { dx, dy } = getDeltaAxis(interaction.startMouse, currentMouse, zoom);

  const shape = interaction.startShapes[0];
  const rad = (shape.rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const localDx = (dx * cos + dy * sin) * 2;
  const localDy = (-dx * sin + dy * cos) * 2;
  const maxDiff = Math.max(localDx, localDy);

  const width = Math.max(1, shape.width + (e.shiftKey ? localDx : maxDiff));
  const height = Math.max(1, shape.height + (e.shiftKey ? localDy : maxDiff));

  const x = interaction.center.x - width / 2;
  const y = interaction.center.y - height / 2;

  return {
    id: shape.id,
    x: Math.round(x),
    y: Math.round(y),
    width,
    height,
  };
};

export default getResizeValue;
