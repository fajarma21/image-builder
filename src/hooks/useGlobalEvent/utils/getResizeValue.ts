import type { ResizingInteraction } from '@/types/interaction';
import getDeltaAxis from '@/utils/getDeltaAxis';

const getResizeValue = (
  e: MouseEvent,
  interaction: ResizingInteraction,
  zoom: number,
) => {
  const { dx, dy } = getDeltaAxis(
    interaction.startMouseX,
    interaction.startMouseY,
    e.clientX,
    e.clientY,
    zoom,
  );

  const shape = interaction.startShapes[0];
  const angle = (shape.rotation * Math.PI) / 180;

  const localDx = (dx * Math.cos(angle) + dy * Math.sin(angle)) * 2;
  const localDy = (-dx * Math.sin(angle) + dy * Math.cos(angle)) * 2;
  const maxDiff = Math.max(localDx, localDy);

  const width = Math.max(1, shape.width + (e.shiftKey ? localDx : maxDiff));
  const height = Math.max(1, shape.height + (e.shiftKey ? localDy : maxDiff));

  const x = interaction.centerX - width / 2;
  const y = interaction.centerY - height / 2;

  return { id: shape.id, x: Math.round(x), y: Math.round(y), width, height };
};

export default getResizeValue;
