import type { ResizingInteraction } from '@/types/interaction';

const getResizeValue = (
  dx: number,
  dy: number,
  interaction: ResizingInteraction,
) => {
  const shape = interaction.startShapes[0];
  const angle = (shape.rotation * Math.PI) / 180;

  const localDx = (dx * Math.cos(angle) + dy * Math.sin(angle)) * 2;
  const localDy = (-dx * Math.sin(angle) + dy * Math.cos(angle)) * 2;

  const width = Math.max(1, shape.width + localDx);
  const height = Math.max(1, shape.height + localDy);

  const x = interaction.centerX - width / 2;
  const y = interaction.centerY - height / 2;

  return { id: shape.id, x, y, width, height };
};

export default getResizeValue;
